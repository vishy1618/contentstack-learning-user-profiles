import React from "react"
import "./profile.css"
import Layout from "../components/layout"

const WorkExperienceTile = (workExperience) => {
  const Title = () => {
    const startYear = new Date(workExperience.start_date).getFullYear()
    const endYear = workExperience.end_date ? new Date(workExperience.end_date).getFullYear() : ""
    return (
      <div>
        <b>{workExperience.company_name}</b> ({startYear}-{endYear})
      </div>
    )
  }
  return (
    <div class="card">
      <div class="container">
        <Title />
        <p>
          <small><i>{workExperience.title}</i></small>
          <div dangerouslySetInnerHTML={{__html: workExperience.summary}} />
        </p>
        {
          workExperience.tech_stack ? 
          <p>
            Experience with tech: <div dangerouslySetInnerHTML={{__html: workExperience.tech_stack}} />
          </p> :
          null
        }
      </div>
    </div>
  )
}

const ProfileTemplate = ({ pageContext }) => {
  const { profile } = pageContext

  return (
    <Layout>
      <img src={profile.display_picture.url} className="display-picture" />
      <h1>{profile.given_name} {profile.surname}</h1>
      <i>{profile.current_title}</i>
      <p>
        <div><b>Age:</b> {_calculateAge(new Date(profile.date_of_birth))} years old</div>
        <div><b>Total work experience:</b> {profile.total_work_experience} years</div>
        <div>
          <b>Past work experience:</b>
          {profile.work_experience.reverse().map(WorkExperienceTile)}
        </div>
      </p>
    </Layout>
  )
}

function _calculateAge(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
export default ProfileTemplate