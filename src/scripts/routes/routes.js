import ResidentList from '../views/pages/resident-list';
import ResidentDetail from '../views/pages/resident-detail';
 
const routes = {
  '/': ResidentList, // default page
  '/resident-list': ResidentList,
  '/resident/:id': ResidentDetail,
};
 
export default routes;