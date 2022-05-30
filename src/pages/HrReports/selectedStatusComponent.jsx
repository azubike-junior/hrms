import React from 'react'

export default function selectedStatusComponent() {
  return (
    <>
      <a className="action-label dropdown-item" aria-expanded="false">
        <i className="fa fa-dot-circle-o text-danger mr-2" />
        Submitted - Awaiting Supervisor Score
      </a>
      <a className="action-label dropdown-item" aria-expanded="false">
        <i className="fa fa-dot-circle-o text-warning mr-2" />
        Pre-Processing - Awaiting Appraisee Comment
      </a>
      <a className="action-label dropdown-item" aria-expanded="false">
        <i className="fa fa-dot-circle-o text-primary mr-2" />
        Processing - Awaiting Supervisor Recommendation
      </a>
      <a className="action-label dropdown-item" aria-expanded="false">
        <i className="fa fa-dot-circle-o text-purple mr-2" />
        In-Progress - Awaiting 2nd level Supervisor Comment
      </a>
      <a className="action-label dropdown-item" aria-expanded="false">
        <i className="fa fa-dot-circle-o text-success mr-2" />
        Completed - End
      </a>
    </>
  );
}
