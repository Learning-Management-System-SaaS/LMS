import { mockMessages} from '../../../data/mockData';
import Table from '../common/table';


const MessagesList: React.FC= () => {

  return(
    <Table 
      title="Messages"
      data={mockMessages}
      columns={[
        { key: "avatar", label: "" },
        { key: "tenantName", label: "Tenant Admin Name" },
        { key: "messageType", label: "Message Type" },
        { key: "lastMessage", label: "Last Message" },
        
      ]}
      action={true}
      readBtn={true}
      haveFilter={true}
      filterFactors={['technicalIssue','complaint','other']}
      searchFn={(item, term) =>
          item.tenantName.toLowerCase().includes(term.toLowerCase()) ||
          item.messageType.toLowerCase().includes(term.toLowerCase())
        }
    />
  )
};

export default MessagesList;