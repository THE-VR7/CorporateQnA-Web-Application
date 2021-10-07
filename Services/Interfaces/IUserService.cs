using Modals.CoreModals;
using Modals.DataModels;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Services.Interfaces
{
    public interface IUserService
    {
        List<UserDetailsView> GetUsers();
        public UserDetailsView GetUserViewById(string userId);
        UserProfile GetUserById(string userId);
        List<QuestionDetailsView> GetQuestionsByUserId(string userId);
        List<AnswerDetailsView> GetAnswersByUserId(string userId);
        List<Like> AnswersLikedByUser(string userId);
        List<Vote> QuestionsVotedByUser(string userId);
        List<Report> QuestionsReportedByUser(string userId);
    }
}
