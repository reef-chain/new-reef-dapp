import React, {useContext, useState} from 'react'
import Uik from "@reef-chain/ui-kit";
import ReefStateContext from '../context/ReefStateContext';
import {availableNetworks, hooks, utils} from '@reef-chain/react-lib';


function AccountPill() {

    const [isOpen, setOpen] = useState(false)
    const { signers, network, reefState } = useContext(ReefStateContext);
  const selectedAccount = hooks.useObservableState(reefState.selectedAccount$);

    const selectNetwork = (key)=> {
      const toSelect = availableNetworks[key];
      reefState.setSelectedNetwork(toSelect);
  };

  const selectAccount = (account)=>{
    reefState.setSelectedAddress(account.address)
  }

  return (
    <div className='account-pill-btn'>
    <Uik.Button text={selectedAccount?.name} rounded fill size='small' onClick={()=>setOpen(true)} className='account-pill-btn-name'/>
    <Uik.Button text={selectedAccount?utils.shortAddress(selectedAccount?.address):''} rounded size='small' onClick={()=>setOpen(true)} className='account-pill-btn-address'/>
    <Uik.AccountSelector
    isOpen={isOpen}
    accounts={signers}
    selectedAccount={selectedAccount}
    onNetworkSelect={selectNetwork}
    selectedNetwork={network?network.name:availableNetworks.mainnet.name}
    onClose={() => setOpen(false)}
    onSelect={account => selectAccount(account)}
  />
    </div>
  )
}

export default AccountPill
