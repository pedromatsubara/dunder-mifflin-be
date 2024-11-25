import * as departmentHistoryService from "../services/departmentHistoryService";
import * as departmentHistoryRepository from "../repositories/departmentHistoryRepository";
import { NotFoundError } from "../utils/customErrors";
import { Transaction } from "sequelize";
import DepartmentHistory from "../database/models/DepartmentHistory";

jest.mock("../repositories/departmentHistoryRepository", () => ({
  findAllByEmployeeId: jest.fn(),
  create: jest.fn(),
  deleteByEmployeeId: jest.fn(),
}));

describe("Department History Service", () => {
  describe("getDepartmentHistoryById", () => {
    it("should return department history when found", async () => {
      const employeeId = 1;
      const mockHistory = [
        { employeeId, departmentId: 2, date: "2024-11-25" },
      ] as DepartmentHistory[];

      (
        departmentHistoryRepository.findAllByEmployeeId as jest.Mock
      ).mockResolvedValue(mockHistory);

      const result = await departmentHistoryService.getDepartmentHistoryById(
        employeeId
      );

      expect(result).toEqual(mockHistory);
      expect(
        departmentHistoryRepository.findAllByEmployeeId
      ).toHaveBeenCalledWith(employeeId);
    });

    it("should throw NotFoundError if no history found", async () => {
      const employeeId = 1;

      (
        departmentHistoryRepository.findAllByEmployeeId as jest.Mock
      ).mockResolvedValue([]);

      await expect(
        departmentHistoryService.getDepartmentHistoryById(employeeId)
      ).rejects.toThrow(
        new NotFoundError(
          `No department history found for employee with ID ${employeeId}`
        )
      );
    });
  });

  describe("createDepartmentChange", () => {
    it("should create a department history record", async () => {
      const employeeId = 1;
      const departmentId = 2;
      const mockTransaction = {} as Transaction;
      const mockHistoryData = { employeeId, departmentId } as DepartmentHistory;

      (departmentHistoryRepository.create as jest.Mock).mockResolvedValue(
        mockHistoryData
      );

      const result = await departmentHistoryService.createDepartmentChange(
        employeeId,
        departmentId,
        mockTransaction
      );

      expect(result).toEqual(mockHistoryData);
      expect(departmentHistoryRepository.create).toHaveBeenCalledWith(
        mockHistoryData,
        mockTransaction
      );
    });
  });

  describe("deleteHistoryByEmployeeId", () => {
    it("should delete department history by employee ID", async () => {
      const employeeId = 1;
      const mockTransaction = {} as Transaction;

      (
        departmentHistoryRepository.deleteByEmployeeId as jest.Mock
      ).mockResolvedValue(undefined);

      await departmentHistoryService.deleteHistoryByEmployeeId(
        employeeId,
        mockTransaction
      );

      expect(
        departmentHistoryRepository.deleteByEmployeeId
      ).toHaveBeenCalledWith(employeeId, mockTransaction);
    });
  });
});
