const { getStore, saveDb, computeSlaDeadline } = require('./db');
const { v4: uuidv4 } = require('uuid');

/**
 * Seed the database with sample agents and tickets.
 * Creates a realistic helpdesk scenario with some overdue tickets.
 */
function seed() {
  const store = getStore();

  // Check if already seeded
  if (store.tickets.length > 0) {
    console.log(`Database already has ${store.tickets.length} tickets, skipping seed.`);
    return;
  }

  console.log('Seeding database...');

  const now = new Date();
  const hoursAgo = (h) => new Date(now.getTime() - h * 60 * 60 * 1000).toISOString();
  const minutesAgo = (m) => new Date(now.getTime() - m * 60 * 1000).toISOString();

  // Create agents
  const agents = [
    { id: uuidv4(), name: 'Priya Sharma', email: 'priya@helpdesk.com', avatar_color: '#5E6AD2', created_at: now.toISOString() },
    { id: uuidv4(), name: 'Ravi Kumar', email: 'ravi@helpdesk.com', avatar_color: '#30A46C', created_at: now.toISOString() }
  ];
  store.agents = agents;

  // Sample tickets
  const ticketData = [
    { title: 'Server room UPS failure — all systems at risk', description: 'The main UPS in Server Room A is showing critical battery failure. All production servers could go down within minutes.', priority: 'critical', status: 'open', customer_name: 'Anil Gupta', customer_email: 'anil@techcorp.com', assigned_to: agents[0].id, created_at: hoursAgo(3) },
    { title: "CEO laptop won't boot before board meeting", description: "CEO's laptop shows blue screen on startup. Board meeting starts in 1 hour. Needs immediate attention.", priority: 'urgent', status: 'open', customer_name: 'Vikram Mehta', customer_email: 'vikram@acme.com', assigned_to: agents[0].id, created_at: hoursAgo(5) },
    { title: 'Email server down — no one can send emails', description: 'Exchange server is not responding. Entire company cannot send or receive emails.', priority: 'urgent', status: 'in-progress', customer_name: 'Sneha Patel', customer_email: 'sneha@globex.com', assigned_to: agents[1].id, created_at: hoursAgo(4) },
    { title: 'VPN not connecting for remote team', description: 'The entire remote development team (15 people) cannot connect to VPN since this morning.', priority: 'high', status: 'open', customer_name: 'Deepak Joshi', customer_email: 'deepak@innovate.io', assigned_to: agents[1].id, created_at: hoursAgo(6) },
    { title: 'Printer on 3rd floor not working', description: 'The shared printer on the 3rd floor is showing paper jam error but there is no paper jam.', priority: 'normal', status: 'open', customer_name: 'Meena Reddy', customer_email: 'meena@techcorp.com', assigned_to: null, created_at: hoursAgo(12) },
    { title: 'Production database showing corruption errors', description: 'MySQL production database throwing corruption errors on the orders table.', priority: 'critical', status: 'open', customer_name: 'Rajesh Iyer', customer_email: 'rajesh@dataflow.com', assigned_to: agents[0].id, created_at: minutesAgo(15) },
    { title: 'Client demo environment crashed', description: 'The staging environment for the Horizon client demo is down. Demo is scheduled for 3 PM today.', priority: 'urgent', status: 'open', customer_name: 'Arjun Nair', customer_email: 'arjun@horizon.com', assigned_to: agents[0].id, created_at: minutesAgo(30) },
    { title: 'Payment gateway integration failing', description: 'Stripe payment webhook is returning 500 errors. Customer payments are not being processed.', priority: 'urgent', status: 'in-progress', customer_name: 'Kavitha Menon', customer_email: 'kavitha@shopease.com', assigned_to: agents[1].id, created_at: minutesAgo(90) },
    { title: 'New employee cannot access Active Directory', description: "Pradeep who joined today cannot log into any system. His AD account seems to not have been provisioned.", priority: 'high', status: 'open', customer_name: 'Pradeep Verma', customer_email: 'pradeep@acme.com', assigned_to: agents[1].id, created_at: hoursAgo(1) },
    { title: 'Wi-Fi dropping intermittently in Building B', description: 'Multiple reports of Wi-Fi disconnections in Building B, floors 2-4. Affecting ~50 employees.', priority: 'high', status: 'open', customer_name: 'Sunita Rao', customer_email: 'sunita@techcorp.com', assigned_to: null, created_at: hoursAgo(3) },
    { title: 'Request for Adobe Creative Suite license', description: 'Marketing team member needs Adobe Creative Suite for design work. Manager has approved.', priority: 'normal', status: 'open', customer_name: 'Ananya Dey', customer_email: 'ananya@acme.com', assigned_to: null, created_at: hoursAgo(2) },
    { title: 'Outlook calendar sync issues', description: 'Calendar events are not syncing between Outlook desktop and mobile app.', priority: 'normal', status: 'open', customer_name: 'Rohit Singh', customer_email: 'rohit@globex.com', assigned_to: agents[0].id, created_at: hoursAgo(4) },
    { title: 'Shared drive folder permissions incorrect', description: 'The Finance shared drive folder is accessible by marketing team members.', priority: 'normal', status: 'in-progress', customer_name: 'Lakshmi Nair', customer_email: 'lakshmi@acme.com', assigned_to: agents[1].id, created_at: hoursAgo(6) },
    { title: 'Request for larger monitor', description: 'Would like to upgrade from 24 inch to 27 inch monitor for better productivity.', priority: 'low', status: 'open', customer_name: 'Karthik Bhat', customer_email: 'karthik@techcorp.com', assigned_to: null, created_at: hoursAgo(2) },
    { title: 'Keyboard spacebar feels sticky', description: 'The spacebar on my keyboard requires extra force to press. Not urgent but slightly annoying.', priority: 'low', status: 'open', customer_name: 'Divya Menon', customer_email: 'divya@innovate.io', assigned_to: null, created_at: hoursAgo(5) },
    { title: 'Can I get a standing desk?', description: 'Interested in getting a standing desk or a desk converter for ergonomic reasons.', priority: 'low', status: 'open', customer_name: 'Amit Sharma', customer_email: 'amit@acme.com', assigned_to: null, created_at: hoursAgo(8) },
    { title: 'Cannot connect to VPN from home', description: 'Getting timeout error when trying to connect to corporate VPN from home network.', priority: 'urgent', status: 'resolved', customer_name: 'Neha Kapoor', customer_email: 'neha@techcorp.com', assigned_to: agents[0].id, created_at: hoursAgo(10), resolved: true },
    { title: 'Laptop running very slow', description: 'Laptop takes 10 minutes to boot and applications freeze. RAM upgrade was performed.', priority: 'high', status: 'resolved', customer_name: 'Sanjay Gupta', customer_email: 'sanjay@globex.com', assigned_to: agents[1].id, created_at: hoursAgo(20), resolved: true },
    { title: 'Zoom audio not working in conference room', description: 'Conference room B audio system was not connecting to Zoom. Fixed by updating drivers.', priority: 'normal', status: 'closed', customer_name: 'Pooja Reddy', customer_email: 'pooja@acme.com', assigned_to: agents[0].id, created_at: hoursAgo(48), resolved: true },
    { title: 'Software update required on lab machines', description: 'The lab machines in Room 201 are running outdated antivirus software.', priority: 'normal', status: 'open', customer_name: 'Dr. Ramesh Kumar', customer_email: 'ramesh@university.edu', assigned_to: agents[1].id, created_at: hoursAgo(3) },
    { title: 'Badge reader not working at south entrance', description: 'Employees cannot badge in through the south entrance.', priority: 'high', status: 'open', customer_name: 'Security Team', customer_email: 'security@techcorp.com', assigned_to: null, created_at: minutesAgo(45) },
    { title: 'Need access to Jira project PHOENIX', description: 'I have been added to the Phoenix project team but do not have access to the Jira board.', priority: 'normal', status: 'open', customer_name: 'Tanvi Kulkarni', customer_email: 'tanvi@innovate.io', assigned_to: null, created_at: hoursAgo(1) },
    { title: 'Laptop webcam not detected after Windows update', description: 'After the latest Windows update, my built-in webcam is no longer detected.', priority: 'normal', status: 'open', customer_name: 'Farhan Ahmed', customer_email: 'farhan@globex.com', assigned_to: agents[0].id, created_at: hoursAgo(5) },
    { title: 'MFA token expired — locked out of all systems', description: 'My Microsoft Authenticator app lost all tokens after phone reset.', priority: 'urgent', status: 'open', customer_name: 'Ritu Malhotra', customer_email: 'ritu@acme.com', assigned_to: null, created_at: minutesAgo(20) },
    { title: 'Network printer showing offline but is powered on', description: "HP LaserJet on 5th floor shows as offline on everyone's machines.", priority: 'normal', status: 'open', customer_name: 'Suresh Babu', customer_email: 'suresh@techcorp.com', assigned_to: null, created_at: hoursAgo(7) },
    { title: 'Request to set up new meeting room AV system', description: 'New meeting room on 4th floor needs projector, webcam, speaker system.', priority: 'low', status: 'open', customer_name: 'Facilities Team', customer_email: 'facilities@techcorp.com', assigned_to: null, created_at: hoursAgo(24) },
    { title: 'Excel macro not working after Office update', description: 'A critical financial reporting macro in Excel stopped working after the latest update.', priority: 'high', status: 'open', customer_name: 'Anjali Deshmukh', customer_email: 'anjali@acme.com', assigned_to: agents[0].id, created_at: hoursAgo(2) },
    { title: 'Slack integration with GitHub broken', description: 'GitHub notifications are no longer posting to our #dev-alerts Slack channel.', priority: 'normal', status: 'open', customer_name: 'DevOps Team', customer_email: 'devops@innovate.io', assigned_to: agents[1].id, created_at: hoursAgo(3) },
    { title: 'Old laptop needs to be decommissioned', description: 'Employee left the company 2 weeks ago. Their laptop needs to be wiped and stored.', priority: 'low', status: 'open', customer_name: 'HR Department', customer_email: 'hr@techcorp.com', assigned_to: null, created_at: hoursAgo(36) },
    { title: 'Internet speed very slow in cafeteria', description: 'Wi-Fi speed in the cafeteria drops to <1 Mbps during lunch hours.', priority: 'low', status: 'open', customer_name: 'Nikhil Jain', customer_email: 'nikhil@acme.com', assigned_to: null, created_at: hoursAgo(10) },
  ];

  store.tickets = ticketData.map(t => {
    const created_at = t.created_at || now.toISOString();
    const resolved_at = t.resolved ? new Date(new Date(created_at).getTime() + 2 * 60 * 60 * 1000).toISOString() : null;
    return {
      id: `TK-${uuidv4().slice(0, 8).toUpperCase()}`,
      title: t.title,
      description: t.description,
      priority: t.priority,
      status: t.status,
      customer_name: t.customer_name,
      customer_email: t.customer_email,
      assigned_to: t.assigned_to || null,
      created_at,
      updated_at: created_at,
      resolved_at,
      sla_deadline: computeSlaDeadline(t.priority, created_at)
    };
  });

  saveDb();
  console.log(`Seeded ${store.tickets.length} tickets and ${store.agents.length} agents.`);
}

module.exports = { seed };
