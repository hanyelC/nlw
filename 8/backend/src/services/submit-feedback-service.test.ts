import { SubmitFeedbackService } from "./submit-feedback-service"

const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackService(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: 'data:image/png;base64,ixP+RJK27ECAA'
    })).resolves.not.toThrow()

    await expect(createFeedbackSpy).toHaveBeenCalled();
    await expect(sendMailSpy).toHaveBeenCalled()

  })

  it('should not be able to submit a feedback without a type', () => {

    expect(submitFeedback.execute({
      type: '',
      comment: 'comment',
      screenshot: 'data:image/png;base64,ixP+RJK27ECAA'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback without a comment', () => {

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64,ixP+RJK27ECAA'
    })).rejects.toThrow()
  })

  it('should not be able to submit a feedback with an invalid screenshot format', () => {

    expect(submitFeedback.execute({
      type: 'BUG',
      comment: 'comment',
      screenshot: 'teste.jpg'
    })).rejects.toThrow()
  })
})