using Modals.CoreModals;
using Modals.DataModels;
using Modals.DataViewModels;
using PetaPoco;
using Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Services.Implementations
{
    public class UserService : IUserService
    {
        private readonly AutoMapper.IMapper Mapper;
        public Database Db { get; set; }

        private readonly IQuestionService QuestionService;
        public UserService(Database db, AutoMapper.IMapper mapper, IQuestionService service)
        {
            this.Db = db;
            this.Mapper = mapper;
            QuestionService = service;
        }

        public List<UserDetailsView> GetUsers()
        {
            return Db.Query<UserDetailsView>("Select * from UserDetails").ToList();
        }

        public UserProfile GetUserById(string userId)
        {
            UserDetailsView currUserDetailView = Db.Query<UserDetailsView>("Select * from UserDetails where Id = @0", userId).FirstOrDefault();
            UserProfile userProfile = Mapper.Map<UserProfile>(currUserDetailView);
            
            var answers = GetAnswersByUserId(userId);
            var questionIdList = new List<int>();
            answers.ForEach((answer) =>
           {
               if (!questionIdList.Contains(answer.QuestionId)  )
               {
                   questionIdList.Add(answer.QuestionId);
               }
           });

            var questionsList = new List<QuestionDetailsView>();

            questionIdList.ForEach((id) =>
            {
                var question = QuestionService.GetQuestionViewById(id);
                questionsList.Add(question);
            });

            userProfile.AnsweredQuestions = questionsList;
            userProfile.Questions = GetQuestionsByUserId(userId);
            userProfile.AnswersLiked = AnswersLikedByUser(userId);
            userProfile.QuestionsVoted = QuestionsVotedByUser(userId);
            userProfile.QuestionsReported = QuestionsReportedByUser(userId);
            return userProfile;
        }

        public UserDetailsView GetUserViewById(string userId)
        {
           return Db.Query<UserDetailsView>("Select * from UserDetails where Id = @0", userId).FirstOrDefault();
        }

        public List<Like> AnswersLikedByUser(string userId)
        {
            return Db.Query<Like>("Select * from Likes where UserId = @0", userId).ToList();
        }

        public List<Vote> QuestionsVotedByUser(string userId)
        {
            return Db.Query<Vote>("Select * from Votes where UserId = @0", userId).ToList();
        }

        public List<Report> QuestionsReportedByUser(string userId)
        {
            return Db.Query<Report>("Select * from Reports where UserId = @0", userId).ToList();
        }

        public List<QuestionDetailsView> GetQuestionsByUserId(string userId)
        {
            return Db.Query<QuestionDetailsView>("Select * from QuestionDetailsView where UserId= @userId", new { userId }).ToList();
        }

        public List<AnswerDetailsView> GetAnswersByUserId(string userId)
        {
            return Db.Query<AnswerDetailsView>("Select * from AnswerDetailsView where UserId= @userId", new { userId }).ToList();
        }
    }
}
