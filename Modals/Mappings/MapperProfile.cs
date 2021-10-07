using AutoMapper;
using Modals.CoreModals;
using Modals.DataViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Modals.Mappings
{
    public class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<QuestionProfile, QuestionDetailsView>();

            CreateMap<QuestionDetailsView, QuestionProfile>()
            .ForPath(dest => dest.Category.Id, opt => opt.MapFrom(src => src.CategoryId))
            .ForPath(dest => dest.Category.Name, opt => opt.MapFrom(src => src.CategoryName))
            .ForPath(dest => dest.Category.Description, opt => opt.MapFrom(src => src.CategoryDescription))
            .ForPath(dest => dest.User.Id, opt => opt.MapFrom(src => src.UserId))
            .ForPath(dest => dest.User.ImageUrl, opt => opt.MapFrom(src => src.UserImage))
            .ForPath(dest => dest.User.Name, opt => opt.MapFrom(src => src.UserName));

            CreateMap<UserDetailsView, UserProfile>();

            CreateMap<UserProfile,UserDetailsView>();

        }

    }
}
