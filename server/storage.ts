import { 
  users, type User, type InsertUser,
  employees, type Employee, type InsertEmployee,
  documents, type Document, type InsertDocument,
  populationRecords, type PopulationRecord, type InsertPopulationRecord,
  investments, type Investment, type InsertInvestment,
  activities, type Activity, type InsertActivity
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Employee methods
  getAllEmployees(): Promise<Employee[]>;
  getEmployee(id: number): Promise<Employee | undefined>;
  createEmployee(employee: InsertEmployee): Promise<Employee>;
  updateEmployee(id: number, employee: Partial<InsertEmployee>): Promise<Employee | undefined>;
  deleteEmployee(id: number): Promise<boolean>;
  getEmployeeCount(): Promise<number>;
  
  // Document methods
  getAllDocuments(): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  createDocument(document: InsertDocument): Promise<Document>;
  deleteDocument(id: number): Promise<boolean>;
  getDocumentCount(): Promise<number>;
  
  // Population methods
  getAllPopulationRecords(): Promise<PopulationRecord[]>;
  createPopulationRecord(record: InsertPopulationRecord): Promise<PopulationRecord>;
  getTotalPopulation(): Promise<number>;
  getAllKebeles(): Promise<string[]>;
  
  // Investment methods
  getAllInvestments(): Promise<Investment[]>;
  getInvestment(id: number): Promise<Investment | undefined>;
  createInvestment(investment: InsertInvestment): Promise<Investment>;
  updateInvestment(id: number, investment: Partial<InsertInvestment>): Promise<Investment | undefined>;
  deleteInvestment(id: number): Promise<boolean>;
  getInvestmentCount(): Promise<number>;
  getAllSectors(): Promise<string[]>;
  
  // Activity methods
  addActivity(action: string, userId?: number, details?: any): Promise<Activity>;
  getRecentActivities(limit?: number): Promise<Activity[]>;
  
  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Employee methods
  async getAllEmployees(): Promise<Employee[]> {
    return await db.select().from(employees).orderBy(desc(employees.id));
  }
  
  async getEmployee(id: number): Promise<Employee | undefined> {
    const [employee] = await db.select().from(employees).where(eq(employees.id, id));
    return employee;
  }
  
  async createEmployee(employee: InsertEmployee): Promise<Employee> {
    const [result] = await db.insert(employees).values(employee).returning();
    return result;
  }
  
  async updateEmployee(id: number, employee: Partial<InsertEmployee>): Promise<Employee | undefined> {
    const [updated] = await db
      .update(employees)
      .set(employee)
      .where(eq(employees.id, id))
      .returning();
    return updated;
  }
  
  async deleteEmployee(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(employees)
      .where(eq(employees.id, id))
      .returning({ id: employees.id });
    return !!deleted;
  }
  
  async getEmployeeCount(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(employees);
    return result[0].count;
  }
  
  // Document methods
  async getAllDocuments(): Promise<Document[]> {
    return await db.select().from(documents).orderBy(desc(documents.createdAt));
  }
  
  async getDocument(id: number): Promise<Document | undefined> {
    const [document] = await db.select().from(documents).where(eq(documents.id, id));
    return document;
  }
  
  async createDocument(document: InsertDocument): Promise<Document> {
    const [result] = await db.insert(documents).values(document).returning();
    return result;
  }
  
  async deleteDocument(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(documents)
      .where(eq(documents.id, id))
      .returning({ id: documents.id });
    return !!deleted;
  }
  
  async getDocumentCount(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(documents);
    return result[0].count;
  }
  
  // Population methods
  async getAllPopulationRecords(): Promise<PopulationRecord[]> {
    return await db.select().from(populationRecords).orderBy(desc(populationRecords.year));
  }
  
  async createPopulationRecord(record: InsertPopulationRecord): Promise<PopulationRecord> {
    const [result] = await db.insert(populationRecords).values(record).returning();
    return result;
  }
  
  async getTotalPopulation(): Promise<number> {
    const result = await db
      .select({
        totalPopulation: sql<number>`SUM(${populationRecords.maleCount} + ${populationRecords.femaleCount})`
      })
      .from(populationRecords);
    return result[0].totalPopulation || 0;
  }
  
  async getAllKebeles(): Promise<string[]> {
    const result = await db
      .select({ kebele: populationRecords.kebele })
      .from(populationRecords)
      .groupBy(populationRecords.kebele);
    return result.map(r => r.kebele);
  }
  
  // Investment methods
  async getAllInvestments(): Promise<Investment[]> {
    return await db.select().from(investments).orderBy(desc(investments.createdAt));
  }
  
  async getInvestment(id: number): Promise<Investment | undefined> {
    const [investment] = await db.select().from(investments).where(eq(investments.id, id));
    return investment;
  }
  
  async createInvestment(investment: InsertInvestment): Promise<Investment> {
    const [result] = await db.insert(investments).values(investment).returning();
    return result;
  }
  
  async updateInvestment(id: number, investment: Partial<InsertInvestment>): Promise<Investment | undefined> {
    const [updated] = await db
      .update(investments)
      .set(investment)
      .where(eq(investments.id, id))
      .returning();
    return updated;
  }
  
  async deleteInvestment(id: number): Promise<boolean> {
    const [deleted] = await db
      .delete(investments)
      .where(eq(investments.id, id))
      .returning({ id: investments.id });
    return !!deleted;
  }
  
  async getInvestmentCount(): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` }).from(investments);
    return result[0].count;
  }
  
  async getAllSectors(): Promise<string[]> {
    const result = await db
      .select({ sector: investments.sector })
      .from(investments)
      .groupBy(investments.sector);
    return result.map(r => r.sector);
  }
  
  // Activity methods
  async addActivity(action: string, userId?: number, details?: any): Promise<Activity> {
    const [activity] = await db
      .insert(activities)
      .values({
        action,
        userId,
        details: details ? JSON.stringify(details) : null,
      })
      .returning();
    return activity;
  }
  
  async getRecentActivities(limit = 10): Promise<Activity[]> {
    return await db
      .select()
      .from(activities)
      .orderBy(desc(activities.timestamp))
      .limit(limit);
  }
}

export const storage = new DatabaseStorage();
