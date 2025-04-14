import { pgTable, text, serial, integer, boolean, timestamp, varchar, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user").notNull(),
  fullName: text("full_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  documents: many(documents),
  employees: many(employees),
  investments: many(investments),
  populationRecords: many(populationRecords),
}));

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  role: true,
  fullName: true,
  email: true,
});

// Employees table
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
  contactNumber: text("contact_number"),
  email: text("email"),
  startDate: timestamp("start_date").defaultNow(),
  salary: integer("salary"),
  status: text("status").default("active"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const employeesRelations = relations(employees, ({ one }) => ({
  createdBy: one(users, {
    fields: [employees.createdBy],
    references: [users.id],
  }),
}));

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
});

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  fileUrl: text("file_url"),
  description: text("description"),
  status: text("status").default("pending"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const documentsRelations = relations(documents, ({ one }) => ({
  createdBy: one(users, {
    fields: [documents.createdBy],
    references: [users.id],
  }),
}));

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Population Records table
export const populationRecords = pgTable("population_records", {
  id: serial("id").primaryKey(),
  kebele: text("kebele").notNull(),
  year: integer("year").notNull(),
  maleCount: integer("male_count").default(0),
  femaleCount: integer("female_count").default(0),
  totalHouseholds: integer("total_households").default(0),
  recordedBy: integer("recorded_by").references(() => users.id),
  recordedAt: timestamp("recorded_at").defaultNow().notNull(),
});

export const populationRecordsRelations = relations(populationRecords, ({ one }) => ({
  recordedBy: one(users, {
    fields: [populationRecords.recordedBy],
    references: [users.id],
  }),
}));

export const insertPopulationRecordSchema = createInsertSchema(populationRecords).omit({
  id: true,
  recordedAt: true,
});

// Investments table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull(),
  investmentAmount: integer("investment_amount"),
  contactPerson: text("contact_person"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  status: text("status").default("pending"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  location: text("location"),
  createdBy: integer("created_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const investmentsRelations = relations(investments, ({ one }) => ({
  createdBy: one(users, {
    fields: [investments.createdBy],
    references: [users.id],
  }),
}));

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
});

// Activities/Audit Log table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: integer("entity_id"),
  details: json("details"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export const activitiesRelations = relations(activities, ({ one }) => ({
  user: one(users, {
    fields: [activities.userId],
    references: [users.id],
  }),
}));

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  timestamp: true,
});

// Export all types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Employee = typeof employees.$inferSelect;

export type InsertDocument = z.infer<typeof insertDocumentSchema>;
export type Document = typeof documents.$inferSelect;

export type InsertPopulationRecord = z.infer<typeof insertPopulationRecordSchema>;
export type PopulationRecord = typeof populationRecords.$inferSelect;

export type InsertInvestment = z.infer<typeof insertInvestmentSchema>;
export type Investment = typeof investments.$inferSelect;

export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
