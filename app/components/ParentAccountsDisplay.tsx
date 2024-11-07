import React, { useState, useEffect } from 'react';
import * as fcl from "@onflow/fcl";
import * as t from '@onflow/types';

interface ParentAccountsDisplayProps {
    address: string;
}

const ParentAccountsDisplay: React.FC<ParentAccountsDisplayProps> = ({ address }) => {
    const [parentAccounts, setParentAccounts] = useState<string[]>([]);

    useEffect(() => {
        const fetchParentAccounts = async () => {
            if (!address) return;

            try {
                const cadenceScript = `
          import HybridCustody from 0xd8a7e05a7ac670c0

            access(all) fun main(child: Address): [Address] {
                let acct = getAuthAccount(child)
                let o = acct.borrow<&HybridCustody.OwnedAccount>(from: HybridCustody.OwnedAccountStoragePath)

                if o == nil {
                    return []
                }

                return o!.getParentStatuses().keys
            }

        `;

                const response: string[] = await fcl.query({
                    cadence: cadenceScript,
                    args: () => [fcl.arg(address, t.Address)],
                });

                setParentAccounts(response);
            } catch (error) {
                console.error("Error fetching parent accounts:", error);
            }
        };

        fetchParentAccounts();
    }, [address]);

    return (
        <div>
            {address ? (
                <div>
                    <h3>Parent Accounts for {address}:</h3>
                    <ul>
                        {parentAccounts.map((parentAccount, index) => (
                            <li key={index}>{parentAccount}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>No Address Provided</div>
            )}
        </div>
    );
};

export default ParentAccountsDisplay;
