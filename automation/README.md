# Automation (n8n Workflows)

This folder contains n8n automation workflows for the CourseCrafter AI project.

## 📁 Folder Structure

```
automation/
│
├── workflows/
│   ├── analyze-prompt.json      # Prompt analysis workflow
│   ├── plan-course.json         # Course structure planning
│   ├── generate-lessons.json    # Lesson content generation
│   └── generate-videos.json     # Video generation pipeline
│
├── env.example                  # Environment variables template
└── README.md
```

## 🚀 Setup

### 1. Install n8n
```bash
npm install -g n8n
```

### 2. Configure Environment
Copy `env.example` to `.env` and fill in your values:
```bash
cp env.example .env
```

Required variables:
- `OPENAI_API_KEY` - Your OpenAI API key
- `BACKEND_URL` - Backend API URL (default: http://localhost:5000)

### 3. Start n8n
```bash
n8n start
```

### 4. Access n8n Interface
```
http://localhost:5678
```

### 5. Import Workflows
1. Open n8n interface
2. Click "Workflows" → "Import from File"
3. Import each workflow from `workflows/` folder

## 📋 Workflows

### 1. Analyze Prompt (`analyze-prompt.json`)
**Endpoint:** `POST /webhook/analyze-prompt`

**Purpose:** Extracts structured data from user prompts

**Input:**
```json
{
  "courseId": "course_id",
  "prompt": "Create a beginner Python course"
}
```

**Output:** Calls backend API with:
```json
{
  "subject": "Python",
  "level": "Beginner",
  "language": "English",
  "style": "Practical"
}
```

### 2. Plan Course (`plan-course.json`)
**Endpoint:** `POST /webhook/plan-course`

**Purpose:** Generates course structure with modules and lessons

**Input:**
```json
{
  "courseId": "course_id",
  "analysis": {
    "subject": "Python",
    "level": "Beginner",
    "language": "English"
  }
}
```

**Output:** Calls backend API with course plan

### 3. Generate Lessons (`generate-lessons.json`)
**Endpoint:** `POST /webhook/generate-lessons`

**Purpose:** Creates detailed lesson content using AI

**Input:**
```json
{
  "courseId": "course_id",
  "moduleId": "module_id",
  "lessonId": "lesson_id",
  "lessonTitle": "Variables in Python",
  "subject": "Python",
  "level": "Beginner"
}
```

**Output:** Saves lesson content to backend

### 4. Generate Videos (`generate-videos.json`)
**Endpoint:** `POST /webhook/generate-videos`

**Purpose:** Converts lesson content to narrated video

**Pipeline:**
1. Text-to-Speech (OpenAI TTS)
2. Video generation (FFmpeg)
3. Save video URL to backend

**Requirements:**
- FFmpeg installed
- Media storage configured

## 🔧 Configuration

### OpenAI Setup
1. Get API key from https://platform.openai.com
2. Add to `.env` file
3. Configure in n8n credentials

### FFmpeg Setup (for video generation)
**Windows:**
```bash
choco install ffmpeg
```

**Linux/Mac:**
```bash
# Ubuntu/Debian
sudo apt install ffmpeg

# Mac
brew install ffmpeg
```

## 🔄 Workflow Integration

### Backend → n8n Flow
```
Backend API
    ↓
Trigger n8n webhook
    ↓
n8n processes workflow
    ↓
n8n calls backend API
    ↓
Backend saves result
```

### Example Backend Code
```javascript
// Trigger prompt analysis
axios.post('http://localhost:5678/webhook/analyze-prompt', {
  courseId: course._id,
  prompt: userPrompt
});
```

## 📝 Notes

- All workflows must callback to backend API
- Use proper error handling in each workflow
- Workflows are stateless - store data in MongoDB
- Test each workflow independently before integration

## 🐛 Troubleshooting

**n8n not starting:**
- Check if port 5678 is available
- Check n8n logs: `~/.n8n/logs`

**Webhook not triggering:**
- Verify webhook URL is correct
- Check n8n workflow is activated
- Test with Postman first

**OpenAI API errors:**
- Verify API key is valid
- Check API quota/billing
- Review OpenAI node configuration

## 📚 Resources

- [n8n Documentation](https://docs.n8n.io)
- [OpenAI API Docs](https://platform.openai.com/docs)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
