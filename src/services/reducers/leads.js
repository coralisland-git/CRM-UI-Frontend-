import { LEADS } from '../actions/types';

class Leads {

  constructor() {
    this.leads = [];
    this.lead_circles = [];
    this.related_contacts = [];
    this.doc_files= [];
    this.current_lead = {};
    this.tags = [];
  }

  getState() {
    return { ...{
      leads: this.leads,
      lead_circles : this.lead_circles,
      related_contacts : this.related_contacts,
      doc_files : this.doc_files,
      current_lead : this.current_lead,
      tags : this.tags
    } };
  }

  setLeads(leads) {
    this.lead = null;
    this.leads = [];
    if (leads.length) {
      leads.forEach((lead) => {
        this.leads.push(lead);
      });
    }
  }

  setCurrentLead(current_lead) {
    this.current_lead = current_lead;
  }


  addLeads(leads) {
    this.leads =this.leads.concat(leads);
  }

  setLeadCircles(lead_circles) {
    if (lead_circles.length) {
      this.lead_circles = [];
      lead_circles.forEach((circle) => {
        this.lead_circles.push(circle);
      });
    }
  }

  setTags(tags) {
    this.tags = null;
    this.tags = [];
    if (tags.length) {
      tags.forEach((tag) => {
        this.tags.push(tag);
      });
    }
  }
  
  patchLead(updated_lead) {

    let leads = this.leads;
    let ind;
    let selected = leads.filter((lead, i) => { ind = i; return lead.id == updated_lead.id });
    if(selected.length == 1)
      leads = leads.slice(ind, 1);
    this.leads = leads.concat(updated_lead);

  }

  setRelatedContacts(related_contacts) {
    this.related_contacts = related_contacts;
  }

  setDocFiles(doc_files) {
    if (doc_files.length) {
      this.doc_files = [];
      doc_files.forEach((doc) => {
        this.doc_files.push(doc);
      });
    }
  }
  // setCalendars(calendars) {
  //   this.calendars = null;
  //   if (calendars.length) {
  //     this.calendars = [];
  //     calendars.forEach((calendar) => {
  //       this.calendars.push(calendar);
  //     })
  //   }
  // }

  // setValue(value, key) {
  //   this.calendar_name = null;
  //   if (key == "calendar_name") {
  //     this.calendar_name = "";
  //     this.calendar_name = value;
  //   }
  // }

}

const Lead = new Leads();

const reducer = (state = Lead.getState(), action) => {
  switch (action.type) {
    case LEADS.GET_ALL:
      Lead.setLeads(action.leads || []); 
      break;
    case LEADS.LEAD_CIRCLES:
      Lead.setLeadCircles(action.lead_circles || []);
      break;
    case LEADS.RELATED_CONTACTS:
      Lead.setRelatedContacts(action.related_contacts || []);
      break;
    case LEADS.DOC_FILES:
      Lead.setDocFiles(action.doc_files || []);
      break;
    case LEADS.CREATE:
      Lead.setLeads(action.leads || []); break;
      break;
    case LEADS.UPDATE:
      Lead.setLeads(action.leads); break;
    case LEADS.BULK_LEAD_CREATE:
      Lead.addLeads(action.leads); break;
    case LEADS.PATCH_LEAD:
      Lead.patchLead(action.payload.lead); break;
    case LEADS.GET_CURRENT_LEAD:
      Lead.setCurrentLead(action.current_lead || {});
      break;
    case LEADS.TAGS_ALL:
      Lead.setTags(action.tags || {});
      break;

    default: return state;
  }
  return Lead.getState();
};

export default reducer;
