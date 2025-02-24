﻿using System;

namespace TwitterAPI.Objects.Mappers.Dtos
{
    public class ForeignUserProfileCardDTO
    {
        public DateTime CreatedDate { get; set; }
        public string Fullname { get; set; }
        public string Username { get; set; }
        public string PersonalInfo { get; set; }
        public string Location { get; set; }
        public string PersonalWebSiteURL { get; set; }
        public string ProfilePicPath { get; set; }
        public string BackgroundPath { get; set; }
        public int FollowerCounter { get; set; }
        public int FollowingCounter { get; set; }
        public bool FollowFlag { get; set; }
    }
}
