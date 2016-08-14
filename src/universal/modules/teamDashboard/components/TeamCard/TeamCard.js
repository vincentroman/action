import React, {PropTypes} from 'react';
import OutcomeCard from 'universal/components/OutcomeCard/OutcomeCard';
import CreateCard from 'universal/components/CreateCard/CreateCard';

const TeamCard = (props) => {
  const {project, teamMembers, teamMemberId} = props;
  const {id, content, editingBy, status, updatedAt} = project;
  const owner = teamMembers.find((m) => m.id === project.teamMemberId);
  const isOutcome = content || owner.id === teamMemberId;
  /**
   * Why generate a form id with the status included? If we move a card
   * by updating it's status, it will unmount the component as it
   * moves columns. redux-form will dispatch a redux-form/DESTROY
   * action asynchronously. If we were to use only the projectId as the
   * form id, this would destroy our form and our forms data. Ouch!
   * So, instead each column gets it's own unique form id.
   */
  const formId = `${status}::${id}`;
  return (
    isOutcome ?
      <OutcomeCard
        content={content}
        editingBy={editingBy}
        form={formId}
        status={status}
        isProject
        owner={owner}
        projectId={id}
        teamMemberId={teamMemberId}
        teamMembers={teamMembers}
        updatedAt={updatedAt}
      /> :
      <CreateCard
        isProject
        isCreating
        createdBy={owner.preferredName}
      />
  );
};

TeamCard.propTypes = {
  project: PropTypes.shape({
    content: PropTypes.string,
    status: PropTypes.string,
    updatedAt: PropTypes.instanceOf(Date)
  }),
  teamMemberId: PropTypes.string,
  teamMembers: PropTypes.array
};

export default TeamCard;
