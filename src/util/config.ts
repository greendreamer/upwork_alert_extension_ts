import { QueryProps, configProps } from './types'

export const config: configProps = {
  gpt_conversation_api: 'https://chat.openai.com/backend-api/conversation',
  gpt_session_api: 'https://chat.openai.com/api/auth/session',
  API_INTERVAL: 3,
  OAuth2Token: 'http://304843596099-0hqqp6hggjf17uq8fshgd8tbe18mtqmk.apps.googleusercontent.com/',
  prompt_list: [
    {
      key: 'Rephrase',
      value: 'Rephrase the below text',
    },
    {
      key: 'Explain',
      value: 'Explain this below text',
    },
    {
      key: 'Summarize',
      value: 'Summarize this below text',
    },
    {
      key: 'Custom',
    },
  ],
  upwork_msg_url: 'https://www.upwork.com/ab/messages/rooms',
}

export function proposalQuery(query: QueryProps) {
  const result: string[] = [
    `Name: ${query?.name}\nSkills: ${query?.skills}\nExperience: ${query.experience}\nInbuilt Proposal: ${query?.proposal}\nClient Name: ${query?.client}`,
    `Client Job Description: ${query?.job_description}`,
    `Extract pain points from client job description and write a cover letter using the Inbuilt Proposal ${
      query.tone ? 'in a ' + query?.tone + ' tone' : ''
    }${
      query.range_of_words
        ? ' and it should not exceed more than ' + query?.range_of_words.split('_')[1] + ' words'
        : ''
    }.`,
    `${query?.optional_info ? ` Additional Instructions: ${query?.optional_info}` : ''}`,
  ].filter(Boolean)

  return result
}

export function clientMsgQuery(client_name: string, message: string, formattedString: string) {
  const result: string[] = [
    `
            Below is the my upwork conversation with ${client_name}
            Please write a message for me
            I want to ${message}
            
            Conversation: ${formattedString}
        `,
  ].filter(Boolean)

  return result
}
