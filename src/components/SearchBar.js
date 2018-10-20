import React from 'react';
import { AutoComplete, Input, Icon } from 'antd';
import nba from 'nba';
import { PROFILE_PIC_URL_PREFIX } from '../constants';

const Option = AutoComplete.Option;

function onSelect(value) {
   console.log('onSelect', value);
}

export class SearchBar extends React.Component {
   state = {
       dataSource: [],
   }
    handleSearch = (value) => {
       this.setState({
           dataSource: !value ? [] : nba.searchPlayers(value).map(({fullName, playerId}) =>
               <Option key={playerId}>
                   <img
                       className="player-option-pic"
                       src={`${PROFILE_PIC_URL_PREFIX}/${playerId}.png`}
                       alt="Profile"
                   />
                   <span className="player-option-label">{fullName}</span>
               </Option>
           )
       });
   }

   render() {
       const { dataSource } = this.state;
       return (
           <AutoComplete
               className="search-bar"
               size="large"
               dataSource={dataSource}
               onSelect={onSelect}
               onSearch={this.handleSearch}
               placeholder="Search NBA Player"
           >
               <Input suffix={<Icon type="search" />} />
           </AutoComplete>
       );
   }
}
