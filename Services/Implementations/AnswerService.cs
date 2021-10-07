using System;
using System.Collections.Generic;
using System.Text;
using Modals.DataModels;
using Modals.DataViewModels;
using PetaPoco;
using Services.Interfaces;


namespace Services.Implementations
{
    public class AnswerService : IAnswerService
    {
        private readonly AutoMapper.IMapper Mapper;
        public Database Db { get; set; }
        public AnswerService(Database db, AutoMapper.IMapper mapper)
        {
            this.Db = db;
            this.Mapper = mapper;
        }

        public bool AddAnswer(Answer answer)
        {
            Db.Insert("Answers", "Id", answer);
            return true;
        }

        public bool LikeAnswer(Like like)
        {
            var currLike = Db.FirstOrDefault<Like>("Select * from Likes where UserId = @0 and AnswerId = @1", like.UserId,like.AnswerId);
            if (currLike == null)
            {
                Db.Insert("Likes", "Id", like);
                return true;
            }
            currLike.IsLiked = !currLike.IsLiked;
            currLike.IsDisliked = false;
            Db.Update("Likes", "Id", currLike);
            return true;
        }

        public bool DislikeAnswer(Like like)
        {
            var currLike = Db.FirstOrDefault<Like>("Select * from Likes where UserId = @0 and AnswerId = @1", like.UserId,like.AnswerId);
            if (currLike == null)
            {
                Db.Insert("Likes", "Id", like);
                return true;
            }
            currLike.IsDisliked = !currLike.IsDisliked;
            currLike.IsLiked = false;
            Db.Update("Likes", "Id", currLike);
            return true;
        }


        public bool MarkAsBestAnswer(int answerId)
        {
            var answer = Db.FirstOrDefault<Answer>("Select * from Answers where Id = @0", answerId);
            answer.IsBestSolution = !answer.IsBestSolution;
            Db.Update("Answers", "Id", answer);
            return true;
        }


        public List<AnswerDetailsView> GetAnswersByUserId(string userId)
        {
            throw new NotImplementedException();
        }
    }
}
