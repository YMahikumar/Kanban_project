import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanGroup.css';
const KanbanGroup = ({ groupTitle, tickets, grouping }) => {

  return (
    <div className="kanban-group">
      {/* <h2>{groupTitle}</h2> Optional: Display group title */}
      <div className="ticket-container">
        {tickets.map((ticket) => {
          // console.log(`Ticket ID: ${ticket.id}, Status: ${ticket.status}`);

          return (
            <div key={ticket.id} className="ticket-card">
              <KanbanCard
                title={ticket.title}
                description={ticket.description}
                priority={ticket.priority}
                status={ticket.status} // Passing status to KanbanCard
                userId={ticket.userId}
                grouping={grouping} // Passing grouping as a prop
                tag={ticket.tag}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KanbanGroup;
