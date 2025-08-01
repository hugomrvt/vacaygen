
interface FormData {
  startDate: string;
  endDate: string;
  reason: string;
  coverage: string;
  tone: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  emergencyContact: string;
  returnDate: string;
  location: string;
  additionalInfo: string;
}

export const generateOutOfOfficeMessage = async (formData: FormData): Promise<string> => {
  // Mock implementation for now - replace with actual OpenAI integration if needed
  const { name, position, company, startDate, endDate, reason, coverage, tone } = formData;
  
  const toneMap = {
    professional: 'professional',
    friendly: 'friendly',
    casual: 'casual',
    formal: 'formal'
  };
  
  const selectedTone = toneMap[tone as keyof typeof toneMap] || 'professional';
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  let message = '';
  
  if (selectedTone === 'professional') {
    message = `I am currently out of the office from ${startDate} to ${endDate}${reason ? ` for ${reason}` : ''}. 

During my absence, ${coverage || 'please contact my team for any urgent matters'}.

I will respond to emails upon my return${endDate ? ` on ${endDate}` : ''}.

Thank you for your understanding.

Best regards,
${name}${position ? `\n${position}` : ''}${company ? `\n${company}` : ''}`;
  } else if (selectedTone === 'friendly') {
    message = `Hi there! 👋

I'm currently away from the office from ${startDate} to ${endDate}${reason ? ` enjoying ${reason}` : ''}.

If you need immediate assistance, ${coverage || 'please reach out to my team'}.

I'll get back to you as soon as I return${endDate ? ` on ${endDate}` : ''}!

Thanks for your patience,
${name}${position ? `\n${position}` : ''}${company ? `\n${company}` : ''}`;
  } else if (selectedTone === 'casual') {
    message = `Hey!

I'm out of office from ${startDate} to ${endDate}${reason ? ` - ${reason}` : ''}! 

${coverage || 'Hit up my team if something urgent comes up'}.

Catch you when I'm back${endDate ? ` on ${endDate}` : ''}!

Cheers,
${name}`;
  } else {
    message = `Dear Colleague,

This is an automated response to inform you that I am currently out of the office from ${startDate} through ${endDate}${reason ? ` due to ${reason}` : ''}.

${coverage || 'For urgent matters, please contact my department'}.

I will resume normal email correspondence upon my return${endDate ? ` on ${endDate}` : ''}.

Respectfully,
${name}${position ? `\n${position}` : ''}${company ? `\n${company}` : ''}`;
  }
  
  return message;
};
