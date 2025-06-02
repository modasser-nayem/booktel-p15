import { userRepository } from "./../app/db/repositories/user.repository";
import request from "supertest";
import app from "../app";

jest.mock("../app/db/repositories/user.repository.ts");

const mockRepo = userRepository as jest.Mocked<typeof userRepository>;

describe("User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Signup
  describe("POST /api/v1/auth/signup -> Signup user", () => {
    it("should return 400, if not provide data", async () => {
      const res = await request(app).post("/api/v1/auth/signup").send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });
});
