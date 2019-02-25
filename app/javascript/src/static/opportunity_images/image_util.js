import AgricultureAndForestry from './Agriculture_forestry.jpg';
import Blockchain from './Blockchain.jpg';
import Cannabis from './Cannabis.jpg';
import ConstructionAndUtilities from './Construction_utilities.jpg';
import ConsumerGoods from './Consumer_goods.jpg';
import Education from './Education.jpg';
import Entertainment from './Entertainment.jpeg';
import FinanceAndInsurance from './Finance_insurance.jpg';
import FoodAndHospitality from './Food_hospitality.jpg';
import HealthServices from './Health_Services.jpg';
import Media from './Media.jpeg';
import NaturalResourcesAndEnvironment from './Natural_resources_environment.jpg';
import Other from './Other.jpg';
import ProfessionalAndBusinessServices from './Professional_business_services.jpg';
import RealEstate from './Real_Estate.jpg';
import TechnologyAndInternet from './Technology_internet.jpg';
import Telecommunications from './Telecommunication.jpg';
import Transportation from './Transportation.jpeg';
import Castle from '../castle.jpg';

import Discover from '../post_opportunities_icons/discover.png'
import Find from '../post_opportunities_icons/find.png'
import InvestCapital from '../post_opportunities_icons/invest_capital.png'
import OtherIcon from '../post_opportunities_icons/other.png'
import RaiseCapital from '../post_opportunities_icons/raise_capital.png'
import Sell from '../post_opportunities_icons/sell.png'

export const PickIcons = (type) => {
  switch(type){
    case 'Find':
      return Find;
    case 'Sell':
      return Sell;
    case 'Raise Capital':
      return RaiseCapital
    case 'Invest Capital':
      return InvestCapital;
    case 'Discover':
      return Discover;
    case 'Other':
      return OtherIcon;
    default:
      return;
  }
}

export const PickImage = (type) => {
  switch(type){
    case 'Agriculture & Forestry':
      return AgricultureAndForestry;
    case 'Blockchain':
      return Blockchain;
    case 'Cannabis':
      return Cannabis;
    case 'Construction & Utilities':
      return ConstructionAndUtilities;
    case 'Consumer Goods':
      return ConsumerGoods;
    case 'Education':
      return Education;
    case 'Entertainment':
      return Entertainment;
    case 'Finance & Insurance':
      return FinanceAndInsurance
    case 'Food & Hospitality':
      return FoodAndHospitality;
    case 'Health Services':
      return HealthServices;
    case 'Media':
      return Media;
    case 'Natural Resources & Environment':
      return NaturalResourcesAndEnvironment;
    case 'Other':
      return Other;
    case 'Professional & Business Services':
      return ProfessionalAndBusinessServices;
    case 'Real Estate':
      return RealEstate;
    case 'Technology & Internet':
      return TechnologyAndInternet;
    case 'Telecommunications':
      return Telecommunications;
    case 'Transportation':
      return Transportation;
    default:
      return Castle;
  }
}
