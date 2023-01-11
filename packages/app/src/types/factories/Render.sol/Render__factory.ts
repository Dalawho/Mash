/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Render, RenderInterface } from "../../Render.sol/Render";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [],
    name: "MAX_LAYERS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collection",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "layerId",
        type: "uint8",
      },
      {
        internalType: "uint8",
        name: "traitId",
        type: "uint8",
      },
    ],
    name: "getTraitDetails",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "mimetype",
            type: "string",
          },
        ],
        internalType: "struct IIndelible.Trait",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "mash",
    outputs: [
      {
        internalType: "contract IMash",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint8",
            name: "collection",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "layerId",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "traitId",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "pfpRender",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "scale",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "xOffset",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "yOffset",
            type: "uint8",
          },
        ],
        internalType: "struct SharedStructs.LayerStruct[7]",
        name: "layerInfo",
        type: "tuple[7]",
      },
    ],
    name: "previewCollage",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newMash",
        type: "address",
      },
    ],
    name: "setMash",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "uint8",
            name: "collection",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "layerId",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "traitId",
            type: "uint8",
          },
          {
            internalType: "bool",
            name: "pfpRender",
            type: "bool",
          },
          {
            internalType: "uint8",
            name: "scale",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "xOffset",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "yOffset",
            type: "uint8",
          },
        ],
        internalType: "struct SharedStructs.LayerStruct[7]",
        name: "layerInfo",
        type: "tuple[7]",
      },
      {
        components: [
          {
            internalType: "address",
            name: "collection",
            type: "address",
          },
          {
            internalType: "uint16",
            name: "maxSupply",
            type: "uint16",
          },
          {
            internalType: "uint16",
            name: "minted",
            type: "uint16",
          },
          {
            internalType: "uint8",
            name: "xSize",
            type: "uint8",
          },
          {
            internalType: "uint8",
            name: "ySize",
            type: "uint8",
          },
        ],
        internalType: "struct SharedStructs.CollectionInfo[7]",
        name: "_collections",
        type: "tuple[7]",
      },
    ],
    name: "tokenURI",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b506121cb806100206000396000f3fe608060405234801561001057600080fd5b506004361061009e5760003560e01c80638a276804116100665780638a276804146101295780638da5cb5b1461013c578063c829b0e31461014d578063c878b73e14610163578063f2fde38b1461017657600080fd5b806341c3627c146100a35780635706032e146100cc578063715018a6146100ec5780637599ead6146100f65780638129fc1c14610121575b600080fd5b6100b66100b1366004611347565b610189565b6040516100c391906113ea565b60405180910390f35b6100df6100da3660046115a7565b61021a565b6040516100c391906115cb565b6100f4610327565b005b606554610109906001600160a01b031681565b6040516001600160a01b0390911681526020016100c3565b6100f461033b565b6100f46101373660046115de565b610451565b6033546001600160a01b0316610109565b610155600781565b6040519081526020016100c3565b6100df61017136600461160b565b61047b565b6100f46101843660046115de565b610888565b60408051808201825260608082526020820152905163ea84b59b60e01b815260ff8481166004830152831660248201526001600160a01b0385169063ea84b59b90604401600060405180830381865afa1580156101ea573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610212919081019061175f565b949350505050565b60606000610226611266565b60005b600781101561031c576065546001600160a01b0316635a1f3c2886836007811061025557610255611806565b60200201515160405160e083901b6001600160e01b031916815260ff909116600482015260240160a060405180830381865afa158015610299573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bd919061181c565b8282600781106102cf576102cf611806565b602002015260008282600781106102e8576102e8611806565b6020020151516001600160a01b03161461030a5782610306816118ca565b9350505b80610314816118e9565b915050610229565b5061021284826108fe565b61032f610c1a565b6103396000610c74565b565b600054610100900460ff161580801561035b5750600054600160ff909116105b806103755750303b158015610375575060005460ff166001145b6103dd5760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b60648201526084015b60405180910390fd5b6000805460ff191660011790558015610400576000805461ff0019166101001790555b610408610cc6565b801561044e576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b50565b610459610c1a565b606580546001600160a01b0319166001600160a01b0392909216919091179055565b606060006104876112b3565b61048f6112da565b60005b600781101561060c578681600781106104ad576104ad611806565b60200201515160ff16156105fa576104de8782600781106104d0576104d0611806565b60200201515160ff16610cf5565b8581600781106104f0576104f0611806565b6020020151600001516001600160a01b0316633cca24206040518163ffffffff1660e01b8152600401600060405180830381865afa158015610536573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f1916820160405261055e9190810190611902565b508894508693505060078310915061057a90505761057a611806565b60200201526105d586826007811061059457610594611806565b6020020151518883600781106105ac576105ac611806565b6020020151602001518984600781106105c7576105c7611806565b602002015160400151610189565b8282600781106105e7576105e7611806565b6020020152836105f6816118ca565b9450505b80610604816118e9565b915050610492565b50600061061888610d3a565b6040516020016106289190611a1e565b60405160208183030381529060405290508060405160200161064a9190611adc565b6040516020818303038152906040529050606060005b60078160ff1610156107f657888160ff166007811061068157610681611806565b60200201515160ff16156107e4576065546001600160a01b031663ef3f0f788a60ff8416600781106106b5576106b5611806565b60200201515160405160e083901b6001600160e01b031916815260ff9091166004820152602401600060405180830381865afa1580156106f9573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f191682016040526107219190810190611b0f565b915060ff81161561074f578260405160200161073d9190611bd2565b60405160208183030381529060405292505b82828a8360ff166007811061076657610766611806565b60200201516020015160ff168151811061078257610782611806565b6020026020010151858360ff166007811061079f5761079f611806565b6020020151518760ff8516600781106107ba576107ba611806565b60200201516040516020016107d29493929190611bf7565b60405160208183030381529060405292505b806107ee816118ca565b915050610660565b50816040516020016108089190611ca7565b60405160208183030381529060405291508460ff1660001461085a57816108376108328a8a6108fe565b610dcd565b604051602001610848929190611ccc565b60405160208183030381529060405291505b8160405160200161086b9190611d41565b60408051808303601f190181529190529998505050505050505050565b610890610c1a565b6001600160a01b0381166108f55760405162461bcd60e51b815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201526564647265737360d01b60648201526084016103d4565b61044e81610c74565b6040805162040060810190915262040040815260006020909101818152835160800151835160609081015190939161093591611d66565b85516080908101518651909101519192506000916109539190611d66565b905060005b6007811015610b885786816007811061097357610973611806565b60200201515160ff1615610b76576109b887826007811061099657610996611806565b60200201518783600781106109ad576109ad611806565b602002015186610f20565b865160600151610b76578260ff168782600781106109d8576109d8611806565b602002015160c001518883600781106109f3576109f3611806565b602002015160800151888460078110610a0e57610a0e611806565b602002015160800151610a219190611d66565b610a2b9190611d8f565b60ff161115610a9c57868160078110610a4657610a46611806565b602002015160c00151878260078110610a6157610a61611806565b602002015160800151878360078110610a7c57610a7c611806565b602002015160800151610a8f9190611d66565b610a999190611d8f565b92505b8160ff16878260078110610ab257610ab2611806565b602002015160a00151888360078110610acd57610acd611806565b602002015160800151888460078110610ae857610ae8611806565b602002015160600151610afb9190611d66565b610b059190611d8f565b60ff161115610b7657868160078110610b2057610b20611806565b602002015160a00151878260078110610b3b57610b3b611806565b602002015160800151878360078110610b5657610b56611806565b602002015160600151610b699190611d66565b610b739190611d8f565b91505b80610b80816118e9565b915050610958565b50610bac6040518060e0016040528060ac81526020016120aa60ac91398490611068565b610bb88160ff16610d3a565b610bc48360ff16610d3a565b610bda610bd560ff8516600a611db4565b610d3a565b610beb610bd560ff8716600a611db4565b86604051602001610c00959493929190611dd3565b604051602081830303815290604052935050505092915050565b6033546001600160a01b031633146103395760405162461bcd60e51b815260206004820181905260248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e657260448201526064016103d4565b603380546001600160a01b038381166001600160a01b0319831681179093556040519116919082907f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e090600090a35050565b600054610100900460ff16610ced5760405162461bcd60e51b81526004016103d490611f02565b610339611081565b61044e81604051602401610d0b91815260200190565b60408051601f198184030181529190526020810180516001600160e01b031663f5b1bba960e01b1790526110b1565b60606000610d47836110d2565b600101905060008167ffffffffffffffff811115610d6757610d6761142c565b6040519080825280601f01601f191660200182016040528015610d91576020820181803683370190505b5090508181016020015b600019016f181899199a1a9b1b9c1cb0b131b232b360811b600a86061a8153600a8504945084610d9b57509392505050565b60608151600003610dec57505060408051602081019091526000815290565b60006040518060600160405280604081526020016121566040913990506000600384516002610e1b9190611f4d565b610e259190611f65565b610e30906004611db4565b67ffffffffffffffff811115610e4857610e4861142c565b6040519080825280601f01601f191660200182016040528015610e72576020820181803683370190505b509050600182016020820185865187015b80821015610ede576003820191508151603f8160121c168501518453600184019350603f81600c1c168501518453600184019350603f8160061c168501518453600184019350603f8116850151845350600183019250610e83565b5050600386510660018114610efa5760028114610f0d57610f15565b603d6001830353603d6002830353610f15565b603d60018303535b509195945050505050565b8151602084015160408086015190516304edd5e560e11b815260ff9283166004820152911660248201526000916001600160a01b0316906309dbabca90604401600060405180830381865afa158015610f7d573d6000803e3d6000fd5b505050506040513d6000823e601f3d908101601f19168201604052610fa59190810190611f87565b905061102a610fba8560a0015160ff16610d3a565b610fca8660c0015160ff16610d3a565b610fe987608001518760600151610fe19190611d66565b60ff16610d3a565b61100088608001518860800151610fe19190611d66565b6040516020016110139493929190611fbc565b60408051601f198184030181529190528390611068565b61103d61103682610dcd565b8390611068565b60408051808201909152600381526211179f60e91b6020820152611062908390611068565b50505050565b6110738282516111ab565b61107d8282611230565b5050565b600054610100900460ff166110a85760405162461bcd60e51b81526004016103d490611f02565b61033933610c74565b80516a636f6e736f6c652e6c6f67602083016000808483855afa5050505050565b60008072184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b83106111115772184f03e93ff9f4daa797ed6e38ed64bf6a1f0160401b830492506040015b6d04ee2d6d415b85acef8100000000831061113d576d04ee2d6d415b85acef8100000000830492506020015b662386f26fc10000831061115b57662386f26fc10000830492506010015b6305f5e1008310611173576305f5e100830492506008015b612710831061118757612710830492506004015b60648310611199576064830492506002015b600a83106111a5576001015b92915050565b60006111bd83601f190151603f190190565b905060008284516111ce9190611f4d565b9050808210156110625760405162461bcd60e51b815260206004820152602760248201527f44796e616d69634275666665723a20417070656e64696e67206f7574206f66206044820152663137bab732399760c91b60648201526084016103d4565b8051602082019150808201602084510184015b8184101561125b578351815260209384019301611243565b505082510190915250565b6040518060e001604052806007905b6040805160a0810182526000808252602080830182905292820181905260608201819052608082015282526000199092019101816112755790505090565b6040518060e001604052806007905b60608152602001906001900390816112c25790505090565b6040518060e001604052806007905b60408051808201909152606080825260208201528152602001906001900390816112e95790505090565b6001600160a01b038116811461044e57600080fd5b60ff8116811461044e57600080fd5b803561134281611328565b919050565b60008060006060848603121561135c57600080fd5b833561136781611313565b9250602084013561137781611328565b9150604084013561138781611328565b809150509250925092565b60005b838110156113ad578181015183820152602001611395565b838111156110625750506000910152565b600081518084526113d6816020860160208601611392565b601f01601f19169290920160200192915050565b60208152600082516040602084015261140660608401826113be565b90506020840151601f1984830301604085015261142382826113be565b95945050505050565b634e487b7160e01b600052604160045260246000fd5b60405160e0810167ffffffffffffffff811182821017156114655761146561142c565b60405290565b60405160a0810167ffffffffffffffff811182821017156114655761146561142c565b604051601f8201601f1916810167ffffffffffffffff811182821017156114b7576114b761142c565b604052919050565b600082601f8301126114d057600080fd5b6114d8611442565b806106208401858111156114eb57600080fd5b845b8181101561159c5760e081880312156115065760008081fd5b61150e611442565b813561151981611328565b815260208281013561152a81611328565b8282015260408381013561153d81611328565b9083015260608381013580151581146115565760008081fd5b908301526080611567848201611337565b9083015260a0611578848201611337565b9083015260c0611589848201611337565b908301529085529093019260e0016114ed565b509095945050505050565b600061062082840312156115ba57600080fd5b6115c483836114bf565b9392505050565b6020815260006115c460208301846113be565b6000602082840312156115f057600080fd5b81356115c481611313565b61ffff8116811461044e57600080fd5b6000806000610aa080858703121561162257600080fd5b843593506020611634878288016114bf565b93508661065f87011261164657600080fd5b61164e611442565b91860191808884111561166057600080fd5b61064088015b848110156116ec5760a0818b03121561167f5760008081fd5b61168761146b565b813561169281611313565b8152818501356116a1816115fb565b818601526040828101356116b4816115fb565b908201526060828101356116c781611328565b908201526080828101356116da81611328565b9082015283529183019160a001611666565b50809450505050509250925092565b600082601f83011261170c57600080fd5b815167ffffffffffffffff8111156117265761172661142c565b611739601f8201601f191660200161148e565b81815284602083860101111561174e57600080fd5b610212826020830160208701611392565b60006020828403121561177157600080fd5b815167ffffffffffffffff8082111561178957600080fd5b908301906040828603121561179d57600080fd5b6040516040810181811083821117156117b8576117b861142c565b6040528251828111156117ca57600080fd5b6117d6878286016116fb565b8252506020830151828111156117eb57600080fd5b6117f7878286016116fb565b60208301525095945050505050565b634e487b7160e01b600052603260045260246000fd5b600060a0828403121561182e57600080fd5b60405160a0810181811067ffffffffffffffff821117156118515761185161142c565b604052825161185f81611313565b8152602083015161186f816115fb565b60208201526040830151611882816115fb565b6040820152606083015161189581611328565b606082015260808301516118a881611328565b60808201529392505050565b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff81036118e0576118e06118b4565b60010192915050565b6000600182016118fb576118fb6118b4565b5060010190565b600080600080600080600060e0888a03121561191d57600080fd5b875167ffffffffffffffff8082111561193557600080fd5b6119418b838c016116fb565b985060208a015191508082111561195757600080fd5b6119638b838c016116fb565b975060408a015191508082111561197957600080fd5b6119858b838c016116fb565b965060608a015191508082111561199b57600080fd5b6119a78b838c016116fb565b955060808a01519150808211156119bd57600080fd5b6119c98b838c016116fb565b945060a08a0151935060c08a01519150808211156119e657600080fd5b506119f38a828b016116fb565b91505092959891949750929550565b60008151611a14818560208601611392565b9290920192915050565b7519185d184e985c1c1b1a58d85d1a5bdb8bda9cdbdb8b60521b8152607b60f81b60168201527f226e616d6522203a2022496e64656c69626c65204d6173687570202300000000601782015260008251611a7f816033850160208701611392565b6201116160ed1b60339390910192830152507f226465736372697074696f6e22203a20225768617420497320546869732c20616036820152731021b937b9b9b7bb32b91022b834b9b7b2329f9160611b6056820152606a01919050565b60008251611aee818460208701611392565b6e2c2261747472696275746573223a5b60881b920191825250600f01919050565b60006020808385031215611b2257600080fd5b825167ffffffffffffffff80821115611b3a57600080fd5b818501915085601f830112611b4e57600080fd5b815181811115611b6057611b6061142c565b8060051b611b6f85820161148e565b9182528381018501918581019089841115611b8957600080fd5b86860192505b83831015611bc557825185811115611ba75760008081fd5b611bb58b89838a01016116fb565b8352509186019190860190611b8f565b9998505050505050505050565b60008251611be4818460208701611392565b600b60fa1b920191825250600101919050565b60008551611c09818460208a01611392565b6e3d913a3930b4ba2fba3cb832911d1160891b9083019081528551611c3581600f840160208a01611392565b6a1116113b30b63ab2911d1160a91b600f92909101918201528451611c6181601a840160208901611392565b6601014333937b6960cd1b601a92909101918201528351611c89816021840160208801611392565b6229227d60e81b602192909101918201526024019695505050505050565b60008251611cb9818460208701611392565b605d60f81b920191825250600101919050565b60008351611cde818460208801611392565b80830190507f2c22696d616765223a2022646174613a696d6167652f7376672b786d6c3b62618152641cd94d8d0b60da1b60208201528351611d27816025840160208801611392565b601160f91b60259290910191820152602601949350505050565b60008251611d53818460208701611392565b607d60f81b920191825250600101919050565b600060ff821660ff84168160ff0481118215151615611d8757611d876118b4565b029392505050565b600060ff821660ff84168060ff03821115611dac57611dac6118b4565b019392505050565b6000816000190483118215151615611dce57611dce6118b4565b500290565b7f3c73766720786d6c6e733d22687474703a2f2f7777772e77332e6f72672f323081527f30302f737667222073686170652d72656e646572696e673d226372697370456460208201527f676573222076657273696f6e3d22312e31222069643d22706978656c2220766960408201526a032bba137bc1e91181018160ad1b606082015260008651611e6b81606b850160208b01611392565b600160fd1b606b918401918201528651611e8c81606c840160208b01611392565b6811103bb4b23a341e9160b91b606c92909101918201528551611eb6816075840160208a01611392565b6911103432b4b3b43a1e9160b11b60759290910191820152611ef6611ef0611ee1607f840188611a02565b620111f160ed1b815260030190565b85611a02565b98975050505050505050565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b60008219821115611f6057611f606118b4565b500190565b600082611f8257634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215611f9957600080fd5b815167ffffffffffffffff811115611fb057600080fd5b610212848285016116fb565b691e34b6b0b3b2903c1e9160b11b81528451600090611fe281600a850160208a01611392565b6411103c9e9160d91b600a91840191820152855161200781600f840160208a01611392565b6811103bb4b23a341e9160b91b600f92909101918201528451612031816018840160208901611392565b6911103432b4b3b43a1e9160b11b60189290910191820152835161205c816022840160208801611392565b0161207f60228201722220687265663d22646174613a696d6167652f60681b9052565b62706e6760e81b6035820152670ed8985cd94d8d0b60c21b6038820152604001969550505050505056fe3c7374796c653e23706978656c207b696d6167652d72656e646572696e673a20706978656c617465643b20696d6167652d72656e646572696e673a202d6d6f7a2d63726973702d65646765733b20696d6167652d72656e646572696e673a202d7765626b69742d63726973702d65646765733b202d6d732d696e746572706f6c6174696f6e2d6d6f64653a206e6561726573742d6e65696768626f723b7d3c2f7374796c653e3c2f7376673e4142434445464748494a4b4c4d4e4f505152535455565758595a6162636465666768696a6b6c6d6e6f707172737475767778797a303132333435363738392b2fa264697066735822122063a357243ed8a8733f84206977776e573532fc8901854945349c851d63b6f91964736f6c634300080d0033";

type RenderConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RenderConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Render__factory extends ContractFactory {
  constructor(...args: RenderConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Render> {
    return super.deploy(overrides || {}) as Promise<Render>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Render {
    return super.attach(address) as Render;
  }
  override connect(signer: Signer): Render__factory {
    return super.connect(signer) as Render__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RenderInterface {
    return new utils.Interface(_abi) as RenderInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Render {
    return new Contract(address, _abi, signerOrProvider) as Render;
  }
}
