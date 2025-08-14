-- CreateTable
CREATE TABLE "TrainingResult" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "sessionId" TEXT NOT NULL,
    "totalTasks" INTEGER NOT NULL,
    "correctAnswers" INTEGER NOT NULL,
    "incorrectAnswers" INTEGER NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TrainingResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "TrainingResult_employeeId_idx" ON "TrainingResult"("employeeId");

-- CreateIndex
CREATE INDEX "TrainingResult_sessionId_idx" ON "TrainingResult"("sessionId");

-- AddForeignKey
ALTER TABLE "TrainingResult" ADD CONSTRAINT "TrainingResult_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
