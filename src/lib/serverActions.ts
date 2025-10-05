'use server';

import { ProjectService } from '@/services/portfolioService';
import { SkillService } from '@/services/portfolioService';
import { AchievementService } from '@/services/portfolioService';
import { TestimonialService } from '@/services/portfolioService';
import { TimelineService } from '@/services/portfolioService';
import { ContactService } from '@/services/portfolioService';
import { UserService } from '@/services/portfolioService';

// Project Server Actions
export async function getProjects(filters?: {
  featured?: boolean;
  category?: string;
  limit?: number;
}) {
  try {
    const projects = await ProjectService.getAllProjects(filters);
    return { success: true, data: projects };
  } catch (error) {
    console.error('Error in getProjects server action:', error);
    return { success: false, error: 'Failed to fetch projects' };
  }
}

export async function getProjectById(id: string) {
  try {
    const project = await ProjectService.getProjectById(id);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project };
  } catch (error) {
    console.error('Error in getProjectById server action:', error);
    return { success: false, error: 'Failed to fetch project' };
  }
}

export async function createProject(projectData: any) {
  try {
    const project = await ProjectService.createProject(projectData);
    return { success: true, data: project, message: 'Project created successfully' };
  } catch (error: any) {
    console.error('Error in createProject server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to create project' };
  }
}

export async function updateProject(id: string, updateData: any) {
  try {
    const project = await ProjectService.updateProject(id, updateData);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, data: project, message: 'Project updated successfully' };
  } catch (error: any) {
    console.error('Error in updateProject server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to update project' };
  }
}

export async function deleteProject(id: string) {
  try {
    const project = await ProjectService.deleteProject(id);
    if (!project) {
      return { success: false, error: 'Project not found' };
    }
    return { success: true, message: 'Project deleted successfully' };
  } catch (error) {
    console.error('Error in deleteProject server action:', error);
    return { success: false, error: 'Failed to delete project' };
  }
}

// Skill Server Actions
export async function getSkills() {
  try {
    const skills = await SkillService.getAllSkills();
    return { success: true, data: skills };
  } catch (error) {
    console.error('Error in getSkills server action:', error);
    return { success: false, error: 'Failed to fetch skills' };
  }
}

export async function createSkill(skillData: any) {
  try {
    const skill = await SkillService.createSkill(skillData);
    return { success: true, data: skill, message: 'Skill category created successfully' };
  } catch (error: any) {
    console.error('Error in createSkill server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to create skill category' };
  }
}

// Achievement Server Actions
export async function getAchievements() {
  try {
    const achievements = await AchievementService.getAllAchievements();
    return { success: true, data: achievements };
  } catch (error) {
    console.error('Error in getAchievements server action:', error);
    return { success: false, error: 'Failed to fetch achievements' };
  }
}

export async function createAchievement(achievementData: any) {
  try {
    const achievement = await AchievementService.createAchievement(achievementData);
    return { success: true, data: achievement, message: 'Achievement created successfully' };
  } catch (error: any) {
    console.error('Error in createAchievement server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to create achievement' };
  }
}

// Testimonial Server Actions
export async function getTestimonials() {
  try {
    const testimonials = await TestimonialService.getAllTestimonials();
    return { success: true, data: testimonials };
  } catch (error) {
    console.error('Error in getTestimonials server action:', error);
    return { success: false, error: 'Failed to fetch testimonials' };
  }
}

export async function createTestimonial(testimonialData: any) {
  try {
    const testimonial = await TestimonialService.createTestimonial(testimonialData);
    return { success: true, data: testimonial, message: 'Testimonial created successfully' };
  } catch (error: any) {
    console.error('Error in createTestimonial server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to create testimonial' };
  }
}

// Timeline Server Actions
export async function getTimelineEntries() {
  try {
    const timeline = await TimelineService.getAllTimelineEntries();
    return { success: true, data: timeline };
  } catch (error) {
    console.error('Error in getTimelineEntries server action:', error);
    return { success: false, error: 'Failed to fetch timeline entries' };
  }
}

export async function createTimelineEntry(timelineData: any) {
  try {
    const timeline = await TimelineService.createTimelineEntry(timelineData);
    return { success: true, data: timeline, message: 'Timeline entry created successfully' };
  } catch (error: any) {
    console.error('Error in createTimelineEntry server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to create timeline entry' };
  }
}

// Contact Server Actions
export async function getContacts(filters?: { status?: string; limit?: number }) {
  try {
    const contacts = await ContactService.getAllContacts(filters);
    return { success: true, data: contacts };
  } catch (error) {
    console.error('Error in getContacts server action:', error);
    return { success: false, error: 'Failed to fetch contacts' };
  }
}

export async function createContact(contactData: any) {
  try {
    const contact = await ContactService.createContact(contactData);
    return { success: true, data: contact, message: 'Contact message sent successfully' };
  } catch (error: any) {
    console.error('Error in createContact server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    return { success: false, error: 'Failed to send contact message' };
  }
}

// User Server Actions
export async function getUserByUsername(username: string) {
  try {
    const user = await UserService.getUserByUsername(username);
    if (!user) {
      return { success: false, error: 'User not found' };
    }
    return { success: true, data: user };
  } catch (error) {
    console.error('Error in getUserByUsername server action:', error);
    return { success: false, error: 'Failed to fetch user' };
  }
}

export async function createUser(userData: any) {
  try {
    const user = await UserService.createUser(userData);
    return { success: true, data: user, message: 'User created successfully' };
  } catch (error: any) {
    console.error('Error in createUser server action:', error);
    if (error.name === 'ValidationError') {
      return { success: false, error: error.message };
    }
    if (error.code === 11000) {
      return { success: false, error: 'User with this email or username already exists' };
    }
    return { success: false, error: 'Failed to create user' };
  }
}
