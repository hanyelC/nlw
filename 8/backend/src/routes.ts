import express from 'express'
import { NodemailerMailAdapter } from './nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prismaFeedbacksRepository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res)=>{
  const { type, comment, screenshot } = req.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbackRepository,
    nodemailerMailAdapter
    )
  
  await submitFeedbackService.execute({
    type,
    comment,
    screenshot 
  })



  return res.status(201).send()
})