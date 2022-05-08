import { FeedbacksRepository } from "../repositories/feedbacksRepository"
import { MailAdapter } from "./mail-service"

interface SubmitFeedbackServiceRequest {
  type: string
  comment: string
  screenshot?: string
}

export class SubmitFeedbackService {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ) {}
  
  async execute(request: SubmitFeedbackServiceRequest){
    const { type, comment, screenshot } = request

    if(!type){
      throw new Error('Type is required')
    }
    
    if(!comment){
      throw new Error('Comment is required')
    }
    
    if(screenshot && !screenshot.startsWith('data:image/png;base64,')){
      throw new Error('Invalid screenshot format.')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback!',
      body: [
        `<div>`,
          `<p>Tipo do feedback: ${type}</p>`,
          `<p>Comentário: ${comment}</p>`,
          screenshot? `<img src="${screenshot}"></img>` : ``, 
        `</div>`,
        
      ].join('\n')
    })
  }
}