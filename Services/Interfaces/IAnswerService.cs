using Modals.DataModels;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IAnswerService
    {
        public bool AddAnswer(Answer answer);
        public bool LikeAnswer(Like like);
        public bool DislikeAnswer(Like like);
        public bool MarkAsBestAnswer(int answerId);   
        //public List<AnswerDetailsView> GetAnswers();
        public List<AnswerDetailsView> GetAnswersByUserId(string userId);

    }
}
