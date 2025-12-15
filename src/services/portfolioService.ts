import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Achievement from '@/models/Achievement';
import Testimonial from '@/models/Testimonial';
import Timeline from '@/models/Timeline';
import Contact from '@/models/Contact';
import User from '@/models/User';

// Project Services
export class ProjectService {
  static async getAllProjects(filters?: {
    featured?: boolean;
    category?: string;
    limit?: number;
  }) {
    await connectToDatabase();
    
    const query: any = {};
    
    if (filters?.featured !== undefined) {
      query.featured = filters.featured;
    }
    
    if (filters?.category) {
      query.category = filters.category;
    }
    
    let projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 });
    
    if (filters?.limit) {
      projects = projects.slice(0, filters.limit);
    }
    
    return projects;
  }

  static async getProjectById(id: string) {
    await connectToDatabase();
    return await Project.findById(id);
  }

  static async createProject(projectData: any) {
    await connectToDatabase();
    const project = new Project(projectData);
    return await project.save();
  }

  static async updateProject(id: string, updateData: any) {
    await connectToDatabase();
    return await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteProject(id: string) {
    await connectToDatabase();
    return await Project.findByIdAndDelete(id);
  }
}

// Skill Services
export class SkillService {
  static async getAllSkills() {
    await connectToDatabase();
    return await Skill.find().sort({ order: 1, createdAt: -1 });
  }

  static async getSkillById(id: string) {
    await connectToDatabase();
    return await Skill.findById(id);
  }

  static async createSkill(skillData: any) {
    await connectToDatabase();
    const skill = new Skill(skillData);
    return await skill.save();
  }

  static async updateSkill(id: string, updateData: any) {
    await connectToDatabase();
    return await Skill.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteSkill(id: string) {
    await connectToDatabase();
    return await Skill.findByIdAndDelete(id);
  }
}

// Achievement Services
export class AchievementService {
  static async getAllAchievements() {
    await connectToDatabase();
    return await Achievement.find().sort({ order: 1, createdAt: -1 });
  }

  static async getAchievementById(id: string) {
    await connectToDatabase();
    return await Achievement.findById(id);
  }

  static async createAchievement(achievementData: any) {
    await connectToDatabase();
    const achievement = new Achievement(achievementData);
    return await achievement.save();
  }

  static async updateAchievement(id: string, updateData: any) {
    await connectToDatabase();
    return await Achievement.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteAchievement(id: string) {
    await connectToDatabase();
    return await Achievement.findByIdAndDelete(id);
  }
}

// Testimonial Services
export class TestimonialService {
  static async getAllTestimonials() {
    await connectToDatabase();
    return await Testimonial.find().sort({ order: 1, createdAt: -1 });
  }

  static async getTestimonialById(id: string) {
    await connectToDatabase();
    return await Testimonial.findById(id);
  }

  static async createTestimonial(testimonialData: any) {
    await connectToDatabase();
    const testimonial = new Testimonial(testimonialData);
    return await testimonial.save();
  }

  static async updateTestimonial(id: string, updateData: any) {
    await connectToDatabase();
    return await Testimonial.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteTestimonial(id: string) {
    await connectToDatabase();
    return await Testimonial.findByIdAndDelete(id);
  }
}

// Timeline Services
export class TimelineService {
  static async getAllTimelineEntries() {
    await connectToDatabase();
    return await Timeline.find().sort({ order: 1, date: -1, createdAt: -1 });
  }

  static async getTimelineEntryById(id: string) {
    await connectToDatabase();
    return await Timeline.findById(id);
  }

  static async createTimelineEntry(timelineData: any) {
    await connectToDatabase();
    const timeline = new Timeline(timelineData);
    return await timeline.save();
  }

  static async updateTimelineEntry(id: string, updateData: any) {
    await connectToDatabase();
    return await Timeline.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteTimelineEntry(id: string) {
    await connectToDatabase();
    return await Timeline.findByIdAndDelete(id);
  }
}

// Contact Services
export class ContactService {
  static async getAllContacts(filters?: { status?: string; limit?: number }) {
    await connectToDatabase();
    
    const query: any = {};
    
    if (filters?.status) {
      query.status = filters.status;
    }
    
    let contacts = await Contact.find(query).sort({ createdAt: -1 });
    
    if (filters?.limit) {
      contacts = contacts.slice(0, filters.limit);
    }
    
    return contacts;
  }

  static async getContactById(id: string) {
    await connectToDatabase();
    return await Contact.findById(id);
  }

  static async createContact(contactData: any) {
    await connectToDatabase();
    const contact = new Contact(contactData);
    return await contact.save();
  }

  static async updateContact(id: string, updateData: any) {
    await connectToDatabase();
    return await Contact.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteContact(id: string) {
    await connectToDatabase();
    return await Contact.findByIdAndDelete(id);
  }
}

// User Services
export class UserService {
  static async getUserByUsername(username: string) {
    await connectToDatabase();
    return await User.findOne({ username });
  }

  static async getUserById(id: string) {
    await connectToDatabase();
    return await User.findById(id);
  }

  static async createUser(userData: any) {
    await connectToDatabase();
    const user = new User(userData);
    return await user.save();
  }

  static async updateUser(id: string, updateData: any) {
    await connectToDatabase();
    return await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  }

  static async deleteUser(id: string) {
    await connectToDatabase();
    return await User.findByIdAndDelete(id);
  }
}
