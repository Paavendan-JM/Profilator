export const generateCoverLetter = async (formData) => {
  const prompt = `

Write a compelling and polished Statement of Purpose (SOP) strictly within 500 words for admission to the Post Graduate Programme in Management (PGP) at ${formData.iimTarget || 'IIM'}. The SOP should be divided into 4 distinct, coherent paragraphs, each with a clear thematic focus and smooth transitions. Maintain a professional, articulate, and confident tone, while being genuine, human, and reflective of the applicant's personal journey and motivations.

Structure Guidelines:

Introduction & Motivation:
Start with a captivating personal anecdote or experience that sparked the applicant’s interest in management and leadership. Clearly express why an MBA and particularly why now. Highlight the evolution from a technical/academic perspective to a desire for strategic, impactful decision-making roles.

Academic & Professional Journey:
Detail the applicant’s academic foundation, major achievements (such as CGPA or rank), and significant professional experiences including internships, projects, and certifications. Emphasize key accomplishments, tools mastered, and lessons learned that contributed to the applicant’s career clarity and interest in product/business roles.

Leadership, Initiative & Community Impact:
Share vivid, specific examples of leadership roles, initiatives, and community involvement — both in professional and extracurricular domains. Show how these experiences shaped the applicant’s values, strengthened soft skills (e.g., communication, empathy, resilience), and reinforced their ambition to create impact through tech and business.

Career Goals & Why IIM:
Clearly articulate short-term and long-term goals, showing alignment with the tech industry and realistic understanding of product management or innovation leadership roles. Justify why this particular IIM — referencing faculty, pedagogy, culture, alumni network, and unique resources like centers or electives that fit the applicant’s ambitions. End with a strong, forward-looking closing that connects the applicant’s past, present, and future impact.

Requirements:
Do not use bullet points or lists; write in fluid, engaging paragraphs.
Avoid clichés and generic statements; personalize deeply with stories, insights, and reflections.
Integrate personal qualities like curiosity, resilience, empathy, and initiative through meaningful anecdotes, not mere claims.
Avoid repetition and overused phrases like "I believe", "I have always", "passionate about", etc.

Applicant Details:

- Full Name: ${formData.fullName}
- Program Applying To: ${formData.program}
- UG College: ${formData.ugCollege}
- Academic Background: ${formData.academic}
- Work Experience: ${formData.workExp}
- Internships: ${formData.internships}
- Certifications and Courses: ${formData.certifications}
- Skills: ${formData.skills}
- Career Goals: ${formData.goals}
- Motivation for MBA and IIM: ${formData.motivation}
- Voluntary Experience: ${formData.voluntary}
- Positions of Responsibility during UG: ${formData.pors}
- Sports/Club Activities during UG: ${formData.sports}
- Academic Achievements: ${formData.academicAchievements}
- Extracurricular Achievements: ${formData.extracurriculars}
- Additional Info: ${formData.extraInfo}

Output only the formatted cover letter (no explanation, no reasoning).
  `.trim();

  const response = await fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'deepseek-r1:8b',
      prompt,
      stream: false
    })
  });

  const data = await response.json();
  return data.response;
};
