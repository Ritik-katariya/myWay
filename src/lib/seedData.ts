import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Achievement from '@/models/Achievement';
import Testimonial from '@/models/Testimonial';
import Timeline from '@/models/Timeline';
import User from '@/models/User';
import { 
  dummyProjects, 
  dummySkills, 
  dummyAchievements, 
  dummyTestimonials, 
  dummyTimeline, 
  dummyUser 
} from './dummyData';

export async function seedDatabase() {
  try {
    await connectToDatabase();
    
    console.log('🌱 Starting database seeding...');
    
    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Achievement.deleteMany({});
    await Testimonial.deleteMany({});
    await Timeline.deleteMany({});
    await User.deleteMany({});
    
    console.log('🗑️ Cleared existing data');
    
    // Seed Projects
    const projects = await Project.insertMany(dummyProjects);
    console.log(`✅ Seeded ${projects.length} projects`);
    
    // Seed Skills
    const skills = await Skill.insertMany(dummySkills);
    console.log(`✅ Seeded ${skills.length} skill categories`);
    
    // Seed Achievements
    const achievements = await Achievement.insertMany(dummyAchievements);
    console.log(`✅ Seeded ${achievements.length} achievements`);
    
    // Seed Testimonials
    const testimonials = await Testimonial.insertMany(dummyTestimonials);
    console.log(`✅ Seeded ${testimonials.length} testimonials`);
    
    // Seed Timeline
    const timeline = await Timeline.insertMany(dummyTimeline);
    console.log(`✅ Seeded ${timeline.length} timeline entries`);
    
    // Seed User
    const user = await User.create(dummyUser);
    console.log(`✅ Seeded user: ${user.name}`);
    
    console.log('🎉 Database seeding completed successfully!');
    
    return {
      success: true,
      message: 'Database seeded successfully',
      counts: {
        projects: projects.length,
        skills: skills.length,
        achievements: achievements.length,
        testimonials: testimonials.length,
        timeline: timeline.length,
        users: 1
      }
    };
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    return {
      success: false,
      error: 'Failed to seed database',
      details: error
    };
  }
}

export async function checkDatabaseStatus() {
  try {
    await connectToDatabase();
    
    const counts = {
      projects: await Project.countDocuments(),
      skills: await Skill.countDocuments(),
      achievements: await Achievement.countDocuments(),
      testimonials: await Testimonial.countDocuments(),
      timeline: await Timeline.countDocuments(),
      users: await User.countDocuments()
    };
    
    const totalRecords = Object.values(counts).reduce((sum, count) => sum + count, 0);
    
    return {
      success: true,
      counts,
      totalRecords,
      isEmpty: totalRecords === 0
    };
  } catch (error) {
    console.error('Error checking database status:', error);
    return {
      success: false,
      error: 'Failed to check database status',
      details: error
    };
  }
}
