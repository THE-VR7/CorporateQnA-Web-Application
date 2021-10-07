using Modals.DataModels;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.CoreModals
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Designation { get; set; }
        public string ImageUrl { get; set; }
        public int QuestionsAsked { get; set; }
        public int QuestionsAnswered { get; set; }
        public int QuestionsSolved { get; set; }
        public int Likes { get; set; }
        public int Dislikes { get; set; }
        public List<QuestionDetailsView> Questions { get; set; }
        public List<QuestionDetailsView> AnsweredQuestions { get; set; }
        public List<Like> AnswersLiked { get; set; }
        public List<Report> QuestionsReported { get; set; }
        public List<Vote> QuestionsVoted { get; set; }

    }
}
