"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;

    // Update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    // create interaction record

    if (userId) {
      // check if the user has already viewed the question
      const existingInteraction = await Interaction.findOne({
        user: userId,
        action: "view",
        question: questionId,
      });

      // if we have an existing interaction, just return
      if (existingInteraction) return console.log("User has already viewed");

      // create a new interaction record, if not
      await Interaction.create({
        user: userId,
        action: "view",
        question: questionId,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to view question");
  }
}
