import * as departmentService from "./departmentService";
import { findAllDepartments } from "../repositories/departmentRepository";
import { NotFoundError } from "../utils/customErrors";
import Department from "../database/models/Department";

jest.mock("../repositories/departmentRepository");

describe("getAllDepartments", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns departments when found", async () => {
    const mockDepartment: Partial<Department> = { id: 1, name: "HR" };
    (findAllDepartments as jest.Mock).mockResolvedValue([mockDepartment]);

    const departments = await departmentService.getAllDepartments();

    expect(departments).toEqual([mockDepartment]);
    expect(findAllDepartments).toHaveBeenCalledTimes(1);
  });

  it("throws NotFoundError when no departments are found", async () => {
    (findAllDepartments as jest.Mock).mockResolvedValue([]);

    await expect(departmentService.getAllDepartments()).rejects.toThrow(
      new NotFoundError("No departments found")
    );
    expect(findAllDepartments).toHaveBeenCalledTimes(1);
  });

  it("throws unexpected errors", async () => {
    const error = new Error("Unexpected error");
    (findAllDepartments as jest.Mock).mockRejectedValue(error);

    await expect(departmentService.getAllDepartments()).rejects.toThrow(error);
    expect(findAllDepartments).toHaveBeenCalledTimes(1);
  });

  it("handles repository errors", async () => {
    const error = new Error("Database error");
    (findAllDepartments as jest.Mock).mockRejectedValue(error);

    await expect(departmentService.getAllDepartments()).rejects.toThrow(error);
    expect(findAllDepartments).toHaveBeenCalledTimes(1);
  });
});
