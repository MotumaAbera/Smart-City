import { User, Employee, Document, PopulationRecord, Investment } from "../shared/schema.js";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export class MemStorage {
  constructor() {
    this.users = new Map();
    this.employees = new Map();
    this.documents = new Map();
    this.populationRecords = new Map();
    this.investments = new Map();
    this.activities = [];
    this.currentId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });

    // Initialize with default data for demo
    this.initializeDefaultData();
  }

  // User methods
  async getUser(id) {
    return this.users.get(id);
  }

  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(userData) {
    const id = this.currentId++;
    const user = { ...userData, id };
    this.users.set(id, user);
    this.addActivity(`New user registered: ${userData.username}`, 'Admin');
    return user;
  }

  // Employee methods
  async getAllEmployees() {
    return Array.from(this.employees.values());
  }

  async getEmployee(id) {
    return this.employees.get(id);
  }

  async createEmployee(employeeData) {
    const id = this.currentId++;
    const now = new Date();
    const employee = { 
      ...employeeData, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.employees.set(id, employee);
    this.addActivity(`New employee added: ${employee.firstName} ${employee.lastName}`, 'Admin');
    return employee;
  }

  async updateEmployee(id, employeeData) {
    const employee = this.employees.get(id);
    if (!employee) return null;

    const updatedEmployee = { 
      ...employee, 
      ...employeeData, 
      id, 
      updatedAt: new Date() 
    };
    this.employees.set(id, updatedEmployee);
    this.addActivity(`Employee updated: ${updatedEmployee.firstName} ${updatedEmployee.lastName}`, 'Admin');
    return updatedEmployee;
  }

  async deleteEmployee(id) {
    const employee = this.employees.get(id);
    if (!employee) return false;
    
    this.employees.delete(id);
    this.addActivity(`Employee deleted: ${employee.firstName} ${employee.lastName}`, 'Admin');
    return true;
  }

  async getEmployeeCount() {
    return this.employees.size;
  }

  // Department methods
  async getAllDepartments() {
    return [
      { id: 1, name: "Administration" },
      { id: 2, name: "Finance" },
      { id: 3, name: "Urban Development" },
      { id: 4, name: "Public Services" },
      { id: 5, name: "Land Management" },
      { id: 6, name: "Education" },
      { id: 7, name: "Health" },
      { id: 8, name: "Infrastructure" },
      { id: 9, name: "Security" },
      { id: 10, name: "Information Technology" },
    ];
  }

  // Document methods
  async getAllDocuments() {
    return Array.from(this.documents.values());
  }

  async getDocument(id) {
    return this.documents.get(id);
  }

  async createDocument(documentData) {
    const id = this.currentId++;
    const now = new Date();
    const document = { 
      ...documentData, 
      id, 
      uploadDate: now 
    };
    this.documents.set(id, document);
    this.addActivity(`New document uploaded: ${document.title}`, 'Admin');
    return document;
  }

  async deleteDocument(id) {
    const document = this.documents.get(id);
    if (!document) return false;
    
    this.documents.delete(id);
    this.addActivity(`Document deleted: ${document.title}`, 'Admin');
    return true;
  }

  async getDocumentCount() {
    return this.documents.size;
  }

  // Population methods
  async getAllPopulationRecords() {
    return Array.from(this.populationRecords.values());
  }

  async createPopulationRecord(recordData) {
    const id = this.currentId++;
    const now = new Date();
    const record = { 
      ...recordData, 
      id, 
      createdAt: now 
    };
    this.populationRecords.set(id, record);
    this.addActivity(`Population record added for ${record.kebele}`, 'Admin');
    return record;
  }

  async getTotalPopulation() {
    const records = Array.from(this.populationRecords.values());
    if (records.length === 0) return 0;
    
    // Return the sum of total population from all records
    return records.reduce((total, record) => total + record.totalPopulation, 0);
  }

  // Kebele methods
  async getAllKebeles() {
    return [
      { id: 1, name: "Kebele 01" },
      { id: 2, name: "Kebele 02" },
      { id: 3, name: "Kebele 03" },
      { id: 4, name: "Kebele 04" },
      { id: 5, name: "Kebele 05" },
    ];
  }

  // Investment methods
  async getAllInvestments() {
    return Array.from(this.investments.values());
  }

  async getInvestment(id) {
    return this.investments.get(id);
  }

  async createInvestment(investmentData) {
    const id = this.currentId++;
    const now = new Date();
    const investment = { 
      ...investmentData, 
      id, 
      createdAt: now, 
      updatedAt: now 
    };
    this.investments.set(id, investment);
    this.addActivity(`New investment recorded: ${investment.companyName}`, 'Admin');
    return investment;
  }

  async updateInvestment(id, investmentData) {
    const investment = this.investments.get(id);
    if (!investment) return null;

    const updatedInvestment = { 
      ...investment, 
      ...investmentData, 
      id, 
      updatedAt: new Date() 
    };
    this.investments.set(id, updatedInvestment);
    this.addActivity(`Investment updated: ${updatedInvestment.companyName}`, 'Admin');
    return updatedInvestment;
  }

  async deleteInvestment(id) {
    const investment = this.investments.get(id);
    if (!investment) return false;
    
    this.investments.delete(id);
    this.addActivity(`Investment deleted: ${investment.companyName}`, 'Admin');
    return true;
  }

  async getInvestmentCount() {
    return this.investments.size;
  }

  // Sector methods
  async getAllSectors() {
    return [
      { id: 1, name: "Agriculture" },
      { id: 2, name: "Manufacturing" },
      { id: 3, name: "Tourism" },
      { id: 4, name: "Technology" },
      { id: 5, name: "Construction" },
      { id: 6, name: "Healthcare" },
      { id: 7, name: "Education" },
      { id: 8, name: "Retail" },
      { id: 9, name: "Energy" },
      { id: 10, name: "Transportation" },
    ];
  }

  // Activity tracking
  addActivity(action, user = 'System', timestamp = new Date()) {
    const activity = {
      id: this.activities.length + 1,
      action,
      user,
      timestamp,
      time: this.getRelativeTime(timestamp)
    };
    this.activities.unshift(activity); // Add to beginning of array
    
    // Limit the number of stored activities
    if (this.activities.length > 100) {
      this.activities = this.activities.slice(0, 100);
    }
    
    return activity;
  }

  async getRecentActivities(limit = 10) {
    return this.activities.slice(0, limit);
  }

  // Helper method for relative time
  getRelativeTime(date) {
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);

    if (diffSec < 60) return `${diffSec} seconds ago`;
    if (diffMin < 60) return `${diffMin} minutes ago`;
    if (diffHour < 24) return `${diffHour} hours ago`;
    if (diffDay < 30) return `${diffDay} days ago`;
    
    return date.toLocaleDateString();
  }

  // Initialize default data for demo
  initializeDefaultData() {
    // Create admin user
    this.createUser({
      username: "admin",
      password: "$2b$10$X4jjUD7/7M9QWNAvT8JJCOEwI.YCxj15zC9.k9dHwDs1Pz00N8GX2.5623a35e2e822d6da111f55aaf48d6a47b1cd9ad56e23a0677ec5f3514f14e07", // "password"
      role: "admin"
    });

    // Add demo employees
    [
      {
        firstName: "Ahmed",
        lastName: "Solomon",
        position: "Chief Administrator",
        department: "Administration",
        email: "ahmed.solomon@bokushanan.gov.et",
        phone: "+251911234567",
        hireDate: "2021-06-15",
        status: "active",
        address: "Boku Shanan, Kebele 02",
        emergencyContact: "Fatima Solomon, +251922345678",
      },
      {
        firstName: "Sara",
        lastName: "Tesfaye",
        position: "Deputy Administrator",
        department: "Administration",
        email: "sara.tesfaye@bokushanan.gov.et",
        phone: "+251911234568",
        hireDate: "2021-08-01",
        status: "active",
        address: "Boku Shanan, Kebele 01",
        emergencyContact: "Dawit Tesfaye, +251922345679",
      },
      {
        firstName: "Daniel",
        lastName: "Bekele",
        position: "Director",
        department: "Urban Development",
        email: "daniel.bekele@bokushanan.gov.et",
        phone: "+251911234569",
        hireDate: "2022-01-10",
        status: "active",
        address: "Boku Shanan, Kebele 03",
        emergencyContact: "Meron Bekele, +251922345680",
      },
      {
        firstName: "Tigist",
        lastName: "Abebe",
        position: "Head",
        department: "Finance",
        email: "tigist.abebe@bokushanan.gov.et",
        phone: "+251911234570",
        hireDate: "2022-03-15",
        status: "active",
        address: "Boku Shanan, Kebele 02",
        emergencyContact: "Yonas Abebe, +251922345681",
      }
    ].forEach(employee => this.createEmployee(employee));

    // Add demo population records
    [
      {
        kebele: "Kebele 01",
        maleCount: 5240,
        femaleCount: 5380,
        childrenCount: 3200,
        adultCount: 6400,
        elderlyCount: 1020,
        totalPopulation: 10620,
        recordDate: "2023-05-15",
      },
      {
        kebele: "Kebele 02",
        maleCount: 4950,
        femaleCount: 5120,
        childrenCount: 3050,
        adultCount: 6100,
        elderlyCount: 920,
        totalPopulation: 10070,
        recordDate: "2023-05-15",
      },
      {
        kebele: "Kebele 03",
        maleCount: 6230,
        femaleCount: 6350,
        childrenCount: 3800,
        adultCount: 7600,
        elderlyCount: 1180,
        totalPopulation: 12580,
        recordDate: "2023-05-15",
      },
      {
        kebele: "Kebele 04",
        maleCount: 5910,
        femaleCount: 6080,
        childrenCount: 3650,
        adultCount: 7200,
        elderlyCount: 1140,
        totalPopulation: 11990,
        recordDate: "2023-05-15",
      },
    ].forEach(record => this.createPopulationRecord(record));

    // Add demo investments
    [
      {
        investorName: "Abebe Kebede",
        companyName: "Green Valley Agriculture",
        sector: "Agriculture",
        projectType: "Farm Development",
        estimatedCapital: 2500000,
        location: "Kebele 03",
        startDate: "2023-03-15",
        expectedCompletionDate: "2024-06-30",
        status: "in-progress",
        description: "Developing a modern farming facility focusing on vegetable production for local and export markets.",
        contactEmail: "abebe@greenvalley.et",
        contactPhone: "+251912345678",
      },
      {
        investorName: "Tigist Haile",
        companyName: "Sunrise Manufacturing",
        sector: "Manufacturing",
        projectType: "Factory Construction",
        estimatedCapital: 8500000,
        location: "Kebele 01",
        startDate: "2023-01-10",
        expectedCompletionDate: "2024-12-15",
        status: "in-progress",
        description: "Building a textile manufacturing facility to produce garments for export.",
        contactEmail: "tigist@sunrisemfg.com",
        contactPhone: "+251987654321",
      },
      {
        investorName: "Bekele Tadesse",
        companyName: "Highland Hospitality",
        sector: "Tourism",
        projectType: "Hotel Construction",
        estimatedCapital: 12000000,
        location: "Kebele 04",
        startDate: "2023-06-01",
        expectedCompletionDate: "2025-05-30",
        status: "planned",
        description: "Constructing a four-star hotel to accommodate tourists and business travelers.",
        contactEmail: "bekele@highlandhotels.com",
        contactPhone: "+251923456789",
      },
    ].forEach(investment => this.createInvestment(investment));

    // Set activities for the dashboard
    this.activities = [
      this.addActivity("System initialized", "System", new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
      this.addActivity("Admin user created", "System", new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
      this.addActivity("Default data populated", "System", new Date(Date.now() - 1000 * 60 * 60 * 24 * 3)),
    ];
  }
}

export const storage = new MemStorage();
