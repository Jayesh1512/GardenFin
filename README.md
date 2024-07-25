# GardenFi task by Team Potato 🥔 

Screenshot of Final Project <br />
![WhatsApp Image 2024-07-25 at 21 53 06_be6d5597](https://github.com/user-attachments/assets/104f556c-6aba-452c-ab87-2815a6eafbfc)
![WhatsApp Image 2024-07-25 at 21 53 06_279b901c](https://github.com/user-attachments/assets/d37ae014-20e6-4a29-8caf-4aff078aacec)

This project is a React component designed for staking tokens using MetaMask. It includes components for connecting to MetaMask, inputting staking amounts, and handling staking operations.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [StakingComponent](#stakingcomponent)
  - [WalletConnect](#walletconnect)
  - [MetaMaskButton](#metamaskbutton)
  - [StakingAmount](#stakingamount)
  - [InputField](#inputfield)
  - [Stake](#stake)
- [Illustrations](#illustrations)

## Features
- Connect to MetaMask for authentication
- Input and calculate token amounts for staking
- Perform staking operations
- Display loading, success, and error messages

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/staking-component.git
    ```
2. Install the dependencies:
    ```bash
    cd staking-component
    npm install
    ```
3. Run the project:
    ```bash
    npm start
    ```

## Usage

### StakingComponent
This is the main component that renders the staking interface. It includes subcomponents for MetaMask connection, input fields for token amounts, and the staking action button.

### WalletConnect
This component manages the connection to MetaMask. It displays a button that, when clicked, connects the user's MetaMask wallet.

### MetaMaskButton
This is a simple button component that changes its appearance and text based on whether MetaMask is connected or not.

### StakingAmount
This component includes input fields for the user to enter the amount of tokens they wish to stake. It also shows the calculated staked amount based on the input.

### InputField
A reusable input field component that can be either editable or read-only. It includes a label and a button next to the input box.

### Stake
This component handles the staking operation. It includes input for the staking address and a button to initiate staking. It also manages the loading state and displays success or error messages.

## Illustrations

### StakingComponent Interface
The `StakingComponent` provides a complete interface for staking tokens. It integrates various subcomponents to offer a seamless user experience.

1. **MetaMask Connection**:
    - A button to connect MetaMask is provided at the top. When connected, the button displays "Connected", otherwise it shows "Connect Metamask".

2. **Token Amount Input**:
    - Users can input the amount of tokens they want to stake. The staked amount is automatically calculated and displayed.

3. **Staking Operation**:
    - A section at the bottom allows users to input the staking address and initiate the staking process.

### Workflow
1. **Connect MetaMask**:
    - Click on the "Connect Metamask" button. Once connected, it will display "Connected".

2. **Enter Token Amount**:
    - Input the amount of tokens to stake in the "Token to Stake" field. The corresponding staked amount will be shown in the "Staked Amount" field.

3. **Enter Staking Address**:
    - Provide the staking address in the input field.

4. **Stake Tokens**:
    - Click the "Stake" button to perform the staking operation. The system will display loading, success, or error messages accordingly.

### Success and Error Messages
- **Loading Message**: Displays "Loading..." when the staking process is in progress.
- **Success Message**: Displays a success message when the staking is completed successfully.
- **Error Message**: Displays an error message if the staking operation fails.

This README provides a comprehensive overview of the `StakingComponent`, guiding users through installation, usage, and understanding the various components involved in the staking process.
