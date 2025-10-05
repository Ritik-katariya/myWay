"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import {
  User,
  FileText,
  Clock,
  Award,
  Briefcase,
  Code,
  MessageSquare,
  Mail,
  Upload,
  Plus,
  Trash2,
  ChevronRight,
  Eye,
  Save,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type {
  IHero,
  IAbout,
  ITimeline,
  IAchievement,
  IProject,
  ISkill,
  ITestimonial,
  IContact,
  SectionType,
} from "@/types/portfolio"

const sections = [
  { id: "hero", label: "Hero & Resume", icon: User },
  { id: "about", label: "About", icon: FileText },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "skills", label: "Skills", icon: Code },
  { id: "testimonials", label: "Testimonials", icon: MessageSquare },
  { id: "contact", label: "Contact", icon: Mail },
] as const

export default function PortfolioDashboard() {
  const [activeSection, setActiveSection] = useState<SectionType>("hero")
  const [resumeFile, setResumeFile] = useState<File | null>(null)

  // Hero data
  const [heroData, setHeroData] = useState<IHero>({
    name: "",
    title: "",
    subtitle: "",
    description: "",
    resumeUrl: "",
    profileImage: "",
    backgroundImage: "",
  })

  // About data
  const [aboutData, setAboutData] = useState<IAbout>({
    bio: "",
    yearsOfExperience: 0,
    location: "",
    email: "",
    phone: "",
    socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
  })

  // Timeline data (multiple)
  const [timelineData, setTimelineData] = useState<Partial<ITimeline>[]>([
    { title: "", content: "", date: new Date(), order: 0 },
  ])

  // Achievements data (multiple)
  const [achievementsData, setAchievementsData] = useState<Partial<IAchievement>[]>([
    { title: "", description: "", icon: "", order: 0 },
  ])

  // Projects data (multiple)
  const [projectsData, setProjectsData] = useState<Partial<IProject>[]>([
    {
      title: "",
      description: "",
      longDescription: "",
      image: "",
      technologies: [],
      githubUrl: "",
      liveUrl: "",
      category: "web",
      status: "completed",
      featured: false,
      order: 0,
    },
  ])

  // Skills data (multiple)
  const [skillsData, setSkillsData] = useState<Partial<ISkill>[]>([{ category: "", skills: [], order: 0 }])

  // Testimonials data (multiple)
  const [testimonialsData, setTestimonialsData] = useState<Partial<ITestimonial>[]>([
    { name: "", designation: "", company: "", quote: "", image: "", rating: 5, order: 0 },
  ])

  // Contact data
  const [contactData, setContactData] = useState<IContact>({
    email: "",
    phone: "",
    address: "",
    availability: "",
  })

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeFile(file)
      // In a real app, you'd upload this to a server
      console.log("[v0] Resume file selected:", file.name)
    }
  }

  const handleNext = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection)
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id as SectionType)
    }
  }

  const handleSave = () => {
    console.log("[v0] Saving data for section:", activeSection)
    // In a real app, you'd save to a database here
  }

  const handleSubmit = () => {
    console.log("[v0] Submitting all portfolio data")
    // In a real app, you'd submit all data to the server
  }

  const handlePreview = () => {
    console.log("[v0] Opening preview")
    // In a real app, you'd open a preview of the portfolio
  }

  const addItem = (type: "timeline" | "achievements" | "projects" | "skills" | "testimonials") => {
    switch (type) {
      case "timeline":
        setTimelineData([...timelineData, { title: "", content: "", date: new Date(), order: timelineData.length }])
        break
      case "achievements":
        setAchievementsData([
          ...achievementsData,
          { title: "", description: "", icon: "", order: achievementsData.length },
        ])
        break
      case "projects":
        setProjectsData([
          ...projectsData,
          {
            title: "",
            description: "",
            image: "",
            technologies: [],
            category: "web",
            status: "completed",
            featured: false,
            order: projectsData.length,
          },
        ])
        break
      case "skills":
        setSkillsData([...skillsData, { category: "", skills: [], order: skillsData.length }])
        break
      case "testimonials":
        setTestimonialsData([
          ...testimonialsData,
          {
            name: "",
            designation: "",
            quote: "",
            image: "",
            rating: 5,
            order: testimonialsData.length,
          },
        ])
        break
    }
  }

  const removeItem = (type: "timeline" | "achievements" | "projects" | "skills" | "testimonials", index: number) => {
    switch (type) {
      case "timeline":
        setTimelineData(timelineData.filter((_, i) => i !== index))
        break
      case "achievements":
        setAchievementsData(achievementsData.filter((_, i) => i !== index))
        break
      case "projects":
        setProjectsData(projectsData.filter((_, i) => i !== index))
        break
      case "skills":
        setSkillsData(skillsData.filter((_, i) => i !== index))
        break
      case "testimonials":
        setTestimonialsData(testimonialsData.filter((_, i) => i !== index))
        break
    }
  }

  const renderForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Hero Section & Resume</h2>
              <p className="text-gray-400">Upload your resume and set up your hero section</p>
            </div>

            {/* Resume Upload */}
            <div className="space-y-3">
              <Label htmlFor="resume" className="text-white">
                Resume (PDF)
              </Label>
              <div className="relative">
                <input type="file" id="resume" accept=".pdf" onChange={handleResumeUpload} className="hidden" />
                <label
                  htmlFor="resume"
                  className="flex items-center justify-center gap-3 p-8 border-2 border-dashed border-cyan-500/30 rounded-lg bg-slate-900/50 hover:bg-slate-900/70 hover:border-cyan-500/50 transition-all cursor-pointer group"
                >
                  <Upload className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  <div className="text-center">
                    <p className="text-white font-medium">{resumeFile ? resumeFile.name : "Click to upload resume"}</p>
                    <p className="text-sm text-gray-400 mt-1">PDF format only</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Hero Fields */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={heroData.name}
                  onChange={(e) => setHeroData({ ...heroData, name: e.target.value })}
                  placeholder="John Doe"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Title
                </Label>
                <Input
                  id="title"
                  value={heroData.title}
                  onChange={(e) => setHeroData({ ...heroData, title: e.target.value })}
                  placeholder="Full Stack Developer"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subtitle" className="text-white">
                  Subtitle (Optional)
                </Label>
                <Input
                  id="subtitle"
                  value={heroData.subtitle}
                  onChange={(e) => setHeroData({ ...heroData, subtitle: e.target.value })}
                  placeholder="Building amazing web experiences"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-white">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={heroData.description}
                  onChange={(e) => setHeroData({ ...heroData, description: e.target.value })}
                  placeholder="Tell visitors about yourself..."
                  rows={4}
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage" className="text-white">
                  Profile Image URL
                </Label>
                <Input
                  id="profileImage"
                  value={heroData.profileImage}
                  onChange={(e) => setHeroData({ ...heroData, profileImage: e.target.value })}
                  placeholder="https://example.com/profile.jpg"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )

      case "about":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">About Section</h2>
              <p className="text-gray-400">Tell your story and share your background</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio" className="text-white">
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  value={aboutData.bio}
                  onChange={(e) => setAboutData({ ...aboutData, bio: e.target.value })}
                  placeholder="Write your professional bio..."
                  rows={6}
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-white">
                    Years of Experience
                  </Label>
                  <Input
                    id="experience"
                    type="number"
                    value={aboutData.yearsOfExperience}
                    onChange={(e) => setAboutData({ ...aboutData, yearsOfExperience: Number.parseInt(e.target.value) })}
                    placeholder="5"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="text-white">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={aboutData.location}
                    onChange={(e) => setAboutData({ ...aboutData, location: e.target.value })}
                    placeholder="San Francisco, CA"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aboutEmail" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="aboutEmail"
                    type="email"
                    value={aboutData.email}
                    onChange={(e) => setAboutData({ ...aboutData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aboutPhone" className="text-white">
                    Phone
                  </Label>
                  <Input
                    id="aboutPhone"
                    value={aboutData.phone}
                    onChange={(e) => setAboutData({ ...aboutData, phone: e.target.value })}
                    placeholder="+1 (555) 123-4567"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-white">Social Links</Label>
                <div className="space-y-3">
                  <Input
                    value={aboutData.socialLinks?.github}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        socialLinks: { ...aboutData.socialLinks, github: e.target.value },
                      })
                    }
                    placeholder="GitHub URL"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                  <Input
                    value={aboutData.socialLinks?.linkedin}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        socialLinks: { ...aboutData.socialLinks, linkedin: e.target.value },
                      })
                    }
                    placeholder="LinkedIn URL"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                  <Input
                    value={aboutData.socialLinks?.twitter}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        socialLinks: { ...aboutData.socialLinks, twitter: e.target.value },
                      })
                    }
                    placeholder="Twitter URL"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                  <Input
                    value={aboutData.socialLinks?.website}
                    onChange={(e) =>
                      setAboutData({
                        ...aboutData,
                        socialLinks: { ...aboutData.socialLinks, website: e.target.value },
                      })
                    }
                    placeholder="Website URL"
                    className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )

      case "timeline":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Timeline</h2>
                <p className="text-gray-400">Add your career milestones and experiences</p>
              </div>
              <Button onClick={() => addItem("timeline")} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Timeline Item
              </Button>
            </div>

            <div className="space-y-4">
              {timelineData.map((item, index) => (
                <Card key={index} className="p-6 bg-slate-900/50 border-cyan-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Timeline Item {index + 1}</h3>
                    {timelineData.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("timeline", index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const newData = [...timelineData]
                          newData[index].title = e.target.value
                          setTimelineData(newData)
                        }}
                        placeholder="Senior Developer at Company X"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Content</Label>
                      <Textarea
                        value={item.content}
                        onChange={(e) => {
                          const newData = [...timelineData]
                          newData[index].content = e.target.value
                          setTimelineData(newData)
                        }}
                        placeholder="Describe your role and achievements..."
                        rows={3}
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Date</Label>
                      <Input
                        type="date"
                        value={item.date ? new Date(item.date).toISOString().split("T")[0] : ""}
                        onChange={(e) => {
                          const newData = [...timelineData]
                          newData[index].date = new Date(e.target.value)
                          setTimelineData(newData)
                        }}
                        className="bg-slate-800/50 border-cyan-500/30 text-white focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "achievements":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Achievements</h2>
                <p className="text-gray-400">Showcase your accomplishments and awards</p>
              </div>
              <Button onClick={() => addItem("achievements")} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Achievement
              </Button>
            </div>

            <div className="space-y-4">
              {achievementsData.map((item, index) => (
                <Card key={index} className="p-6 bg-slate-900/50 border-cyan-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Achievement {index + 1}</h3>
                    {achievementsData.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("achievements", index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const newData = [...achievementsData]
                          newData[index].title = e.target.value
                          setAchievementsData(newData)
                        }}
                        placeholder="Best Developer Award 2024"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Description</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          const newData = [...achievementsData]
                          newData[index].description = e.target.value
                          setAchievementsData(newData)
                        }}
                        placeholder="Describe your achievement..."
                        rows={3}
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Icon (Optional)</Label>
                      <Input
                        value={item.icon}
                        onChange={(e) => {
                          const newData = [...achievementsData]
                          newData[index].icon = e.target.value
                          setAchievementsData(newData)
                        }}
                        placeholder="trophy, award, star"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "projects":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Projects</h2>
                <p className="text-gray-400">Display your best work and projects</p>
              </div>
              <Button onClick={() => addItem("projects")} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            <div className="space-y-4">
              {projectsData.map((item, index) => (
                <Card key={index} className="p-6 bg-slate-900/50 border-cyan-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Project {index + 1}</h3>
                    {projectsData.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("projects", index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Title</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => {
                          const newData = [...projectsData]
                          newData[index].title = e.target.value
                          setProjectsData(newData)
                        }}
                        placeholder="E-commerce Platform"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Short Description</Label>
                      <Textarea
                        value={item.description}
                        onChange={(e) => {
                          const newData = [...projectsData]
                          newData[index].description = e.target.value
                          setProjectsData(newData)
                        }}
                        placeholder="Brief description of the project..."
                        rows={2}
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Long Description (Optional)</Label>
                      <Textarea
                        value={item.longDescription}
                        onChange={(e) => {
                          const newData = [...projectsData]
                          newData[index].longDescription = e.target.value
                          setProjectsData(newData)
                        }}
                        placeholder="Detailed description..."
                        rows={3}
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Main Image URL</Label>
                        <Input
                          value={item.image}
                          onChange={(e) => {
                            const newData = [...projectsData]
                            newData[index].image = e.target.value
                            setProjectsData(newData)
                          }}
                          placeholder="https://example.com/image.jpg"
                          className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Category</Label>
                        <select
                          value={item.category}
                          onChange={(e) => {
                            const newData = [...projectsData]
                            newData[index].category = e.target.value as any
                            setProjectsData(newData)
                          }}
                          className="w-full h-10 px-3 rounded-md bg-slate-800/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        >
                          <option value="web">Web</option>
                          <option value="mobile">Mobile</option>
                          <option value="desktop">Desktop</option>
                          <option value="ai">AI</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Status</Label>
                        <select
                          value={item.status}
                          onChange={(e) => {
                            const newData = [...projectsData]
                            newData[index].status = e.target.value as any
                            setProjectsData(newData)
                          }}
                          className="w-full h-10 px-3 rounded-md bg-slate-800/50 border border-cyan-500/30 text-white focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                        >
                          <option value="completed">Completed</option>
                          <option value="in-progress">In Progress</option>
                          <option value="planned">Planned</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.featured}
                            onChange={(e) => {
                              const newData = [...projectsData]
                              newData[index].featured = e.target.checked
                              setProjectsData(newData)
                            }}
                            className="w-4 h-4 rounded border-cyan-500/30 bg-slate-800/50 text-cyan-500 focus:ring-cyan-500"
                          />
                          Featured Project
                        </Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Technologies (comma-separated)</Label>
                      <Input
                        value={item.technologies?.join(", ")}
                        onChange={(e) => {
                          const newData = [...projectsData]
                          newData[index].technologies = e.target.value.split(",").map((t) => t.trim())
                          setProjectsData(newData)
                        }}
                        placeholder="React, Node.js, MongoDB"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">GitHub URL (Optional)</Label>
                        <Input
                          value={item.githubUrl}
                          onChange={(e) => {
                            const newData = [...projectsData]
                            newData[index].githubUrl = e.target.value
                            setProjectsData(newData)
                          }}
                          placeholder="https://github.com/..."
                          className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Live URL (Optional)</Label>
                        <Input
                          value={item.liveUrl}
                          onChange={(e) => {
                            const newData = [...projectsData]
                            newData[index].liveUrl = e.target.value
                            setProjectsData(newData)
                          }}
                          placeholder="https://project.com"
                          className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Skills</h2>
                <p className="text-gray-400">List your technical and professional skills</p>
              </div>
              <Button onClick={() => addItem("skills")} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill Category
              </Button>
            </div>

            <div className="space-y-4">
              {skillsData.map((item, index) => (
                <Card key={index} className="p-6 bg-slate-900/50 border-cyan-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Skill Category {index + 1}</h3>
                    {skillsData.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("skills", index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-white">Category Name</Label>
                      <Input
                        value={item.category}
                        onChange={(e) => {
                          const newData = [...skillsData]
                          newData[index].category = e.target.value
                          setSkillsData(newData)
                        }}
                        placeholder="Frontend Development"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Skills (comma-separated)</Label>
                      <Textarea
                        value={item.skills?.join(", ")}
                        onChange={(e) => {
                          const newData = [...skillsData]
                          newData[index].skills = e.target.value.split(",").map((s) => s.trim())
                          setSkillsData(newData)
                        }}
                        placeholder="React, Vue.js, Angular, TypeScript"
                        rows={3}
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "testimonials":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Testimonials</h2>
                <p className="text-gray-400">Add reviews and feedback from clients</p>
              </div>
              <Button onClick={() => addItem("testimonials")} className="bg-cyan-500 hover:bg-cyan-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Testimonial
              </Button>
            </div>

            <div className="space-y-4">
              {testimonialsData.map((item, index) => (
                <Card key={index} className="p-6 bg-slate-900/50 border-cyan-500/30">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-semibold text-cyan-400">Testimonial {index + 1}</h3>
                    {testimonialsData.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem("testimonials", index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Name</Label>
                        <Input
                          value={item.name}
                          onChange={(e) => {
                            const newData = [...testimonialsData]
                            newData[index].name = e.target.value
                            setTestimonialsData(newData)
                          }}
                          placeholder="Jane Smith"
                          className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Designation</Label>
                        <Input
                          value={item.designation}
                          onChange={(e) => {
                            const newData = [...testimonialsData]
                            newData[index].designation = e.target.value
                            setTestimonialsData(newData)
                          }}
                          placeholder="CEO"
                          className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Company (Optional)</Label>
                      <Input
                        value={item.company}
                        onChange={(e) => {
                          const newData = [...testimonialsData]
                          newData[index].company = e.target.value
                          setTestimonialsData(newData)
                        }}
                        placeholder="Tech Corp"
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-white">Quote</Label>
                      <Textarea
                        value={item.quote}
                        onChange={(e) => {
                          const newData = [...testimonialsData]
                          newData[index].quote = e.target.value
                          setTestimonialsData(newData)
                        }}
                        placeholder="Write the testimonial quote..."
                        rows={4}
                        className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-white">Image URL</Label>
                        <Input
                          value={item.image}
                          onChange={(e) => {
                            const newData = [...testimonialsData]
                            newData[index].image = e.target.value
                            setTestimonialsData(newData)
                          }}
                          placeholder="https://example.com/avatar.jpg"
                          className="bg-slate-800/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Rating (1-5)</Label>
                        <Input
                          type="number"
                          min="1"
                          max="5"
                          value={item.rating}
                          onChange={(e) => {
                            const newData = [...testimonialsData]
                            newData[index].rating = Number.parseInt(e.target.value)
                            setTestimonialsData(newData)
                          }}
                          className="bg-slate-800/50 border-cyan-500/30 text-white focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )

      case "contact":
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
              <p className="text-gray-400">How can people reach you?</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-white">
                  Email
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={contactData.email}
                  onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                  placeholder="contact@example.com"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-white">
                  Phone (Optional)
                </Label>
                <Input
                  id="contactPhone"
                  value={contactData.phone}
                  onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="text-white">
                  Address (Optional)
                </Label>
                <Textarea
                  id="address"
                  value={contactData.address}
                  onChange={(e) => setContactData({ ...contactData, address: e.target.value })}
                  placeholder="123 Main St, City, State, ZIP"
                  rows={3}
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability" className="text-white">
                  Availability
                </Label>
                <Input
                  id="availability"
                  value={contactData.availability}
                  onChange={(e) => setContactData({ ...contactData, availability: e.target.value })}
                  placeholder="Available for freelance work"
                  className="bg-slate-900/50 border-cyan-500/30 text-white placeholder:text-gray-500 focus:border-cyan-500"
                />
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const isLastSection = activeSection === "contact"

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020618] via-[#0a1628] to-[#020618]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-72 border-r border-cyan-500/20 bg-slate-900/30 backdrop-blur-sm p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Portfolio Dashboard</h1>
            <p className="text-sm text-gray-400">Manage your portfolio content</p>
          </div>

          <nav className="space-y-2">
            {sections.map((section) => {
              const Icon = section.icon
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as SectionType)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                    activeSection === section.id
                      ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 shadow-lg shadow-cyan-500/20"
                      : "text-gray-400 hover:text-white hover:bg-slate-800/50",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-8">
            {renderForm()}

            {/* Action Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-cyan-500/20">
              <Button
                onClick={handleSave}
                variant="outline"
                className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 bg-transparent"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Progress
              </Button>

              <div className="flex gap-3">
                {isLastSection ? (
                  <>
                    <Button
                      onClick={handlePreview}
                      variant="outline"
                      className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:text-cyan-300 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                    >
                      Submit Portfolio
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={handleNext}
                    className="bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/20"
                  >
                    Save & Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
