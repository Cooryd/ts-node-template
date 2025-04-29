describe("entry", () => {
  it("calls without error", async () => {
    await expect(import("./index.ts")).resolves.not.toThrow();
  });
});
