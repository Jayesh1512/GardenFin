import { useEffect, useState } from "react";
import { useMetaMaskStore, useStaking, useSignStore } from "./store";
import { Assets } from "@gardenfi/orderbook";

type AmountState = {
  tokenAmount: string | null;
  stakedAmount: string | null;
};

const StakingComponent: React.FC = () => {
  const [amount, setAmount] = useState<AmountState>({
    tokenAmount: null,
    stakedAmount: null,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const changeAmount = (value: string) => {
    handleTokenChange(value);
  };

  const handleTokenChange = (value: string) => {
    const newAmount: AmountState = { tokenAmount: value, stakedAmount: null };
    if (Number(value) > 0) {
      const stakedAmount = (Number(value) * 0.9).toFixed(8).toString(); // Example calculation
      newAmount.stakedAmount = stakedAmount;
    }
    setAmount(newAmount);
  };

  return (
    <div className="staking-component">
      <WalletConnect />
      <hr />
      <StakingAmount amount={amount} changeAmount={changeAmount} />
      <hr />
      <Stake amount={amount} changeAmount={changeAmount} setSuccess={setSuccess} setError={setError} setLoading={setLoading} />
      {loading && <p>Loading...</p>}
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

const WalletConnect: React.FC = () => {
  const { connectMetaMask, metaMaskIsConnected } = useMetaMaskStore();

  return (
    <div className="staking-component-top-section">
      <span className="staking-title">Stake</span>
      <MetaMaskButton
        isConnected={metaMaskIsConnected}
        onClick={connectMetaMask}
      />
    </div>
  );
};

type MetaMaskButtonProps = {
  isConnected: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isConnected,
  onClick,
}) => {
  const buttonClass = `connect-metamask button-${isConnected ? "black" : "white"}`;
  const buttonText = isConnected ? "Connected" : "Connect Metamask";

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

type StakingAmountComponentProps = {
  amount: AmountState;
  changeAmount: (value: string) => void;
};

const StakingAmount: React.FC<StakingAmountComponentProps> = ({
  amount,
  changeAmount,
}) => {
  const { tokenAmount, stakedAmount } = amount;

  return (
    <div className="staking-component-middle-section">
      <InputField
        id="token"
        label="Token to Stake"
        value={tokenAmount}
        onChange={(value) => changeAmount(value)}
      />
      <InputField id="staked" label="Staked Amount" value={stakedAmount} readOnly />
    </div>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string | null;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  readOnly,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div className="input-component">
      <input
        id={id}
        placeholder="0"
        value={value ? value : ""}
        type="number"
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button>{id.toUpperCase()}</button>
    </div>
  </div>
);

type StakeAndAddressComponentProps = {
  amount: AmountState;
  changeAmount: (value: string) => void;
  setSuccess: (message: string | null) => void;
  setError: (message: string | null) => void;
  setLoading: (loading: boolean) => void;
};

const Stake: React.FC<StakeAndAddressComponentProps> = ({
  amount,
  changeAmount,
  setSuccess,
  setError,
  setLoading,
}) => {
  const { staking } = useStaking();
  const [stakeAddress, setStakeAddress] = useState<string>("");
  const { metaMaskIsConnected } = useMetaMaskStore();
  const { tokenAmount, stakedAmount } = amount;

  const { isSigned } = useSignStore();

  useEffect(() => {
    if (!staking) return;
    const getAddress = async () => {
      if (isSigned) {
        const address = await staking.getAddress();
        setStakeAddress(address);
      }
    };
    getAddress();
  }, [staking, isSigned]);

  const handleStake = async () => {
    if (!staking || !tokenAmount || !stakedAmount || !stakeAddress) return;

    const tokenAmountNumber = Number(tokenAmount);
    const stakedAmountNumber = Number(stakedAmount);

    if (isNaN(tokenAmountNumber) || isNaN(stakedAmountNumber)) {
      setError("Invalid amount values.");
      return;
    }

    const stakeAmount = tokenAmountNumber * 1e8; // Example scaling
    const stakedAmountValue = stakedAmountNumber * 1e8; // Example scaling

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await staking.stake(
        Assets.ethereum_localnet.WBTC, // Use the correct asset for staking
        stakeAmount,
        stakedAmountValue
      );
      setSuccess("Staking successful!");
      changeAmount(""); // Clear input values
    } catch (error) {
      setError("Failed to stake tokens. Please try again.");
      console.log("Failed to stake tokens:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="staking-component-bottom-section">
      <div>
        <label htmlFor="stake-address">Address</label>
        <div className="input-component">
          <input
            id="stake-address"
            placeholder="Address"
            value={stakeAddress}
            onChange={(e) => setStakeAddress(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`button-${metaMaskIsConnected ? "white" : "black"}`}
        onClick={handleStake}
        disabled={!metaMaskIsConnected}
      >
        Stake
      </button>
    </div>
  );
};

export default StakingComponent;
