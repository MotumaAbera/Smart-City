import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table for authentication
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").default("user"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Employees table
export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  position: text("position").notNull(),
  department: text("department").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  hireDate: text("hire_date").notNull(),
  status: text("status").notNull().default("active"),
  address: text("address"),
  emergencyContact: text("emergency_contact"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Documents table
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description"),
  filePath: text("file_path").notNull(),
  fileSize: integer("file_size").notNull(),
  fileType: text("file_type").notNull(),
  tags: text("tags").array(),
  uploadDate: timestamp("upload_date").defaultNow(),
  uploadedBy: integer("uploaded_by").references(() => users.id),
});

export const insertDocumentSchema = createInsertSchema(documents).omit({
  id: true,
  uploadDate: true,
});

// Population records table
export const populationRecords = pgTable("population_records", {
  id: serial("id").primaryKey(),
  kebele: text("kebele").notNull(),
  maleCount: integer("male_count").notNull(),
  femaleCount: integer("female_count").notNull(),
  childrenCount: integer("children_count").notNull(),
  adultCount: integer("adult_count").notNull(),
  elderlyCount: integer("elderly_count").notNull(),
  totalPopulation: integer("total_population").notNull(),
  recordDate: text("record_date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedBy: integer("updated_by").references(() => users.id),
});

export const insertPopulationSchema = createInsertSchema(populationRecords).omit({
  id: true,
  createdAt: true,
});

// Investment records table
export const investments = pgTable("investments", {
  id: serial("id").primaryKey(),
  investorName: text("investor_name").notNull(),
  companyName: text("company_name").notNull(),
  sector: text("sector").notNull(),
  projectType: text("project_type").notNull(),
  estimatedCapital: integer("estimated_capital").notNull(),
  location: text("location").notNull(),
  startDate: text("start_date").notNull(),
  expectedCompletionDate: text("expected_completion_date").notNull(),
  status: text("status").notNull().default("planned"),
  description: text("description"),
  contactEmail: text("contact_email"),
  contactPhone: text("contact_phone"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

export const insertInvestmentSchema = createInsertSchema(investments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Type exports
export const User = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
  createdAt: z.date().optional(),
});

export const Employee = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  position: z.string(),
  department: z.string(),
  email: z.string(),
  phone: z.string(),
  hireDate: z.string(),
  status: z.string(),
  address: z.string().optional(),
  emergencyContact: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const Document = z.object({
  id: z.number(),
  title: z.string(),
  category: z.string(),
  description: z.string().optional(),
  filePath: z.string(),
  fileSize: z.number(),
  fileType: z.string(),
  tags: z.array(z.string()),
  uploadDate: z.date(),
  uploadedBy: z.number().optional(),
});

export const PopulationRecord = z.object({
  id: z.number(),
  kebele: z.string(),
  maleCount: z.number(),
  femaleCount: z.number(),
  childrenCount: z.number(),
  adultCount: z.number(),
  elderlyCount: z.number(),
  totalPopulation: z.number(),
  recordDate: z.string(),
  createdAt: z.date().optional(),
  updatedBy: z.number().optional(),
});

export const Investment = z.object({
  id: z.number(),
  investorName: z.string(),
  companyName: z.string(),
  sector: z.string(),
  projectType: z.string(),
  estimatedCapital: z.number(),
  location: z.string(),
  startDate: z.string(),
  expectedCompletionDate: z.string(),
  status: z.string(),
  description: z.string().optional(),
  contactEmail: z.string().optional(),
  contactPhone: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  createdBy: z.number().optional(),
});

// Create type interfaces using Zod's .parse() method
export const InsertUser = insertUserSchema;
export const InsertEmployee = insertEmployeeSchema;
export const InsertDocument = insertDocumentSchema;
export const InsertPopulationRecord = insertPopulationSchema;
export const InsertInvestment = insertInvestmentSchema;
