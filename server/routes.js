import { setupAuth } from "./auth.js";
import { storage } from "./storage.js";
import { createServer } from "http";
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { insertEmployeeSchema, insertPopulationSchema, insertInvestmentSchema } from "../shared/schema.js";

// Set up multer for file upload handling
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max file size
});

// Ensure uploads directory exists
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads", { recursive: true });
}

export async function registerRoutes(app) {
  // Set up authentication routes
  setupAuth(app);

  // Employee routes
  app.get("/api/employees", async (req, res) => {
    try {
      const employees = await storage.getAllEmployees();
      res.json(employees);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/employees/:id", async (req, res) => {
    try {
      const employee = await storage.getEmployee(parseInt(req.params.id));
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/employees", async (req, res) => {
    try {
      const validData = insertEmployeeSchema.parse(req.body);
      const employee = await storage.createEmployee(validData);
      res.status(201).json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/employees/:id", async (req, res) => {
    try {
      const validData = insertEmployeeSchema.parse(req.body);
      const employee = await storage.updateEmployee(parseInt(req.params.id), validData);
      if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.json(employee);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/employees/:id", async (req, res) => {
    try {
      const success = await storage.deleteEmployee(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Department routes
  app.get("/api/departments", async (req, res) => {
    try {
      const departments = await storage.getAllDepartments();
      res.json(departments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Document routes
  app.get("/api/documents", async (req, res) => {
    try {
      const documents = await storage.getAllDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/documents", upload.single("file"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const { title, category, description } = req.body;
      let tags = [];
      
      if (req.body.tags) {
        try {
          tags = JSON.parse(req.body.tags);
        } catch (e) {
          console.error("Error parsing tags:", e);
          tags = [];
        }
      }

      const document = await storage.createDocument({
        title,
        category,
        description,
        filePath: req.file.path,
        fileSize: req.file.size,
        fileType: req.file.mimetype,
        tags,
        uploadedBy: req.user?.id || null,
      });

      res.status(201).json(document);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/documents/:id", async (req, res) => {
    try {
      const document = await storage.getDocument(parseInt(req.params.id));
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/documents/:id/download", async (req, res) => {
    try {
      const document = await storage.getDocument(parseInt(req.params.id));
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      const filePath = document.filePath;
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: "File not found" });
      }

      res.download(filePath, document.title + path.extname(filePath));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.delete("/api/documents/:id", async (req, res) => {
    try {
      const document = await storage.getDocument(parseInt(req.params.id));
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }

      // Delete the file from the filesystem
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }

      const success = await storage.deleteDocument(parseInt(req.params.id));
      if (!success) {
        return res.status(500).json({ message: "Failed to delete document" });
      }

      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Population routes
  app.get("/api/population", async (req, res) => {
    try {
      const records = await storage.getAllPopulationRecords();
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/population", async (req, res) => {
    try {
      const validData = insertPopulationSchema.parse(req.body);
      const record = await storage.createPopulationRecord({
        ...validData,
        updatedBy: req.user?.id || null,
      });
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  // Kebele routes
  app.get("/api/kebeles", async (req, res) => {
    try {
      const kebeles = await storage.getAllKebeles();
      res.json(kebeles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Investment routes
  app.get("/api/investments", async (req, res) => {
    try {
      const investments = await storage.getAllInvestments();
      res.json(investments);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/investments/:id", async (req, res) => {
    try {
      const investment = await storage.getInvestment(parseInt(req.params.id));
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
      res.json(investment);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/investments", async (req, res) => {
    try {
      const validData = insertInvestmentSchema.parse(req.body);
      const investment = await storage.createInvestment({
        ...validData,
        createdBy: req.user?.id || null,
      });
      res.status(201).json(investment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.put("/api/investments/:id", async (req, res) => {
    try {
      const validData = insertInvestmentSchema.parse(req.body);
      const investment = await storage.updateInvestment(parseInt(req.params.id), validData);
      if (!investment) {
        return res.status(404).json({ message: "Investment not found" });
      }
      res.json(investment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

  app.delete("/api/investments/:id", async (req, res) => {
    try {
      const success = await storage.deleteInvestment(parseInt(req.params.id));
      if (!success) {
        return res.status(404).json({ message: "Investment not found" });
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Sector routes
  app.get("/api/sectors", async (req, res) => {
    try {
      const sectors = await storage.getAllSectors();
      res.json(sectors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin dashboard stats
  app.get("/api/admin/stats", async (req, res) => {
    try {
      // Get count of employees, documents, investments, and total population
      const employeeCount = await storage.getEmployeeCount();
      const documentCount = await storage.getDocumentCount();
      const investmentCount = await storage.getInvestmentCount();
      const populationTotal = await storage.getTotalPopulation();

      res.json({
        employees: employeeCount,
        documents: documentCount,
        investments: investmentCount,
        population: populationTotal
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/recent-activities", async (req, res) => {
    try {
      const activities = await storage.getRecentActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
