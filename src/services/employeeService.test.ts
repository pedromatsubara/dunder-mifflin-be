import * as employeeService from "../services/employeeService";
import * as employeeRepository from "../repositories/employeeRepository";
import * as departmentHistoryService from "../services/departmentHistoryService";
import * as fileService from "../services/fileService";
import sequelize from "../database/models";
import { NotFoundError } from "../utils/customErrors";
import Employee from "../database/models/Employee";
import { Transaction } from "sequelize";

jest.mock("../repositories/employeeRepository", () => ({
  findAll: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  deleteEmployee: jest.fn(),
}));

jest.mock("../services/departmentHistoryService", () => ({
  createDepartmentChange: jest.fn(),
  deleteHistoryByEmployeeId: jest.fn(),
}));

jest.mock("../services/fileService", () => ({
  saveImage: jest.fn(),
  deleteImage: jest.fn(),
}));

jest.mock("../database/models", () => ({
  __esModule: true,
  default: {
    transaction: jest.fn().mockImplementation(() => ({
      commit: jest.fn(),
      rollback: jest.fn(),
    })),
  },
}));

describe("Employee Service", () => {
  let mockTransaction: Transaction;

  beforeEach(async () => {
    mockTransaction = {
      commit: jest.fn(),
      rollback: jest.fn(),
    } as unknown as Transaction;

    (sequelize.transaction as jest.Mock).mockResolvedValue(mockTransaction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllEmployees", () => {
    it("should return all employees", async () => {
      const mockEmployees = [
        {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          departmentId: 2,
        },
      ] as Employee[];
      (employeeRepository.findAll as jest.Mock).mockResolvedValue(
        mockEmployees
      );

      const result = await employeeService.getAllEmployees();

      expect(result).toEqual(mockEmployees);
      expect(employeeRepository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe("getEmployeeById", () => {
    it("should return the employee when found", async () => {
      const mockEmployee = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        departmentId: 2,
      } as Employee;
      (employeeRepository.findById as jest.Mock).mockResolvedValue(
        mockEmployee
      );

      const result = await employeeService.getEmployeeById(1);

      expect(result).toEqual(mockEmployee);
      expect(employeeRepository.findById).toHaveBeenCalledWith(1);
    });

    it("should throw NotFoundError when employee not found", async () => {
      (employeeRepository.findById as jest.Mock).mockResolvedValue(null);

      await expect(employeeService.getEmployeeById(1)).rejects.toThrow(
        new NotFoundError("Employee with ID 1 not found")
      );
    });
  });

  describe("createEmployee", () => {
    it("should create an employee and image", async () => {
      const employeeData = {
        firstName: "John",
        lastName: "Doe",
        departmentId: 2,
      };
      const mockEmployee = { id: 1, ...employeeData } as Employee;
      const mockAvatar = {
        buffer: Buffer.from("avatar"),
      } as Express.Multer.File;

      (employeeRepository.create as jest.Mock).mockResolvedValue(mockEmployee);

      const result = await employeeService.createEmployee(
        employeeData,
        mockAvatar
      );

      expect(result).toEqual(mockEmployee);
      expect(employeeRepository.create).toHaveBeenCalledWith(
        employeeData,
        mockTransaction
      );
      expect(
        departmentHistoryService.createDepartmentChange
      ).toHaveBeenCalledWith(
        mockEmployee.id,
        employeeData.departmentId,
        mockTransaction
      );
      expect(fileService.saveImage).toHaveBeenCalledWith(
        mockAvatar.buffer,
        `employee-${mockEmployee.id}.jpg`
      );
      expect(mockTransaction.commit).toHaveBeenCalled();
    });

    it("should rollback transaction on error", async () => {
      const employeeData = {
        firstName: "John",
        lastName: "Doe",
        departmentId: 2,
      };

      (employeeRepository.create as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await expect(
        employeeService.createEmployee(employeeData)
      ).rejects.toThrow("Error");
      expect(mockTransaction.rollback).toHaveBeenCalled();
    });
  });

  describe("updateEmployee", () => {
    it("should update an employee and commit the transaction", async () => {
      const mockEmployee = { id: 1, departmentId: 2 } as Employee;
      const updates = { departmentId: 3 };

      (employeeRepository.findById as jest.Mock).mockResolvedValue(
        mockEmployee
      );
      (employeeRepository.update as jest.Mock).mockResolvedValue(null);

      const result = await employeeService.updateEmployee(1, updates);

      expect(result).toEqual(mockEmployee);
      expect(
        departmentHistoryService.createDepartmentChange
      ).toHaveBeenCalledWith(1, updates.departmentId, mockTransaction);
      expect(employeeRepository.update).toHaveBeenCalledWith(
        1,
        updates,
        mockTransaction
      );
      expect(mockTransaction.commit).toHaveBeenCalled();
    });

    it("should rollback transaction on error", async () => {
      const updates = { departmentId: 3 };

      (employeeRepository.findById as jest.Mock).mockRejectedValue(
        new Error("Error")
      );

      await expect(employeeService.updateEmployee(1, updates)).rejects.toThrow(
        "Error"
      );
      expect(mockTransaction.rollback).toHaveBeenCalled();
    });
  });

  describe("deleteEmployee", () => {
    it("should delete an employee and image", async () => {
      (
        departmentHistoryService.deleteHistoryByEmployeeId as jest.Mock
      ).mockResolvedValue(null);
      (employeeRepository.deleteEmployee as jest.Mock).mockResolvedValue(null);
      (fileService.deleteImage as jest.Mock).mockResolvedValue(null);

      await employeeService.deleteEmployee(1);

      expect(
        departmentHistoryService.deleteHistoryByEmployeeId
      ).toHaveBeenCalledWith(1, mockTransaction);
      expect(employeeRepository.deleteEmployee).toHaveBeenCalledWith(
        1,
        mockTransaction
      );
      expect(fileService.deleteImage).toHaveBeenCalledWith("employee-1.jpg");
      expect(mockTransaction.commit).toHaveBeenCalled();
    });

    it("should rollback transaction on error", async () => {
      (
        departmentHistoryService.deleteHistoryByEmployeeId as jest.Mock
      ).mockRejectedValue(new Error("Error"));

      await expect(employeeService.deleteEmployee(1)).rejects.toThrow("Error");
      expect(mockTransaction.rollback).toHaveBeenCalled();
    });
  });
});
