import React, { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import * as t from '@onflow/types';

import FetchNFTs from '../cadence/scripts/FetchNFTsFromLinkedAccts.cdc'

interface AddressDisplayProps {
  address: string;
}

const ChildAddressDisplay: React.FC<AddressDisplayProps> = ({ address }) => {
  const [linkedAddresses, setLinkedAddresses] = useState<string[]>([]);

  useEffect(() => {
    const fetchLinkedAddresses = async () => {
      if (!address) return;

      try {
        const cadenceScript = FetchNFTs;

        const response: string[] = await fcl.query({
          cadence: cadenceScript,
          args: () => [fcl.arg(address, t.Address)],
        });

        console.log(response);

        setLinkedAddresses(response);
      } catch (error) {
        console.error("Error fetching linked addresses:", error);
      }
    };

    fetchLinkedAddresses();
  }, [address]);

  return (
    <div>
      {address ? (
        <div>
          <h3>Linked Addresses for {address}:</h3>
          <ul>
            {linkedAddresses.map((linkedAddress, index) => (
              <li key={index}>{linkedAddress}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No Address Provided</div>
      )}
    </div>
  );
};

export default ChildAddressDisplay;
