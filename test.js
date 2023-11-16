function same(arr, arr2) {
   if(arr.length !== arr2.length)return false;
   let frequencyCounter1={};
    let frequencyCounter2={};
    for(let val of arr){
        frequencyCounter1[val]=(frequencyCounter1[val]||0)+1;
    }
    for(let val of arr2){
        frequencyCounter2[val]=(frequencyCounter2[val]||0)+1;
    }
    console.log(frequencyCounter1,'and ',frequencyCounter2);
    for(let key in frequencyCounter1){
        if(!(key**2 in frequencyCounter2))return false;
        if(!(frequencyCounter2[key**2]) in frequencyCounter1)return false;
    
    }
     return true;
  }
  
// console.log(  same([1,2,3],[4,1,9]));

// write a program to check the Valid angram  using frequncy counter

function isValidAngram(str1,str2){
  if(str1.length !==str2.length)return false;
  let lookUp={};
  
   for(let val of str1){
    lookUp[val]=(lookUp[val]||0)+1
   }
  
   for(let val of str2){
    if(!lookUp[val]){
        return false
    }else {
   lookUp[val]-=1
    }
   }

   return true
}



function sumZero(arr){
    if(!arr.length)return false;
    let first=0;
    let last=arr.length-1;
    while(last>first){
        if((arr[first]+arr[last])==0){

            return [arr[first],arr[last]]
        }
        first++;
        last--;
    }
  return undefined;
}









function countUniqueValues(arr){
    if(!arr.length)return 0;
    let first=0;
    let second=1;
    while(second<arr.length){
        if(arr[first] !=arr[second]){ 
           first++;
           arr[first]=arr[second]
        }else{
         second++
        }
    
        
    }
    console.log(first)
    return first+1
}



function sumSubArray(arr,n){
  if(n>arr.length)return [];;
  let res=[];
  let tempSum=0;
  for(let i=0;i<n;i++){
    tempSum+=arr[i]
  }
  res.push(tempSum);
  for(let i=n;i<arr.length;i++){
      console.log(tempSum,'temp')
    tempSum=tempSum-arr[i-n]+arr[i];
    res.push(tempSum)
  }
  return res;
}
// console.log(sumSubArray([1,2,3,2,11,3],2))


// longest sub string 

 function longestSubString(str){
  let start = 0; // Start of the current substring
  let end = 0;   // End of the current substring
  let maxLength = 0; // Length of the longest substring found
  let maxStart = 0; // Starting index of the longest substring found
  const charIndexMap = {}; // Map to store the most recent index of each character

  // Iterate through the string with the 'end' pointer
  while (end < str.length) {
    const char = str[end];

    // Check if the character exists in the map and if its index is greater than or equal to 'start'
    if (charIndexMap[char]  && charIndexMap[char] >= start) {
      // Move the 'start' pointer to the right of the repeating character
      start = charIndexMap[char] + 1;
      
    }
    
    // Update the index of the current character
    charIndexMap[char] = end;
    console.log(charIndexMap)
    
    // Update maxLength and maxStart if the current substring is longer
    console.log(start,'start end',end)
    const currentLength = end - start + 1;
    // console.log(currentLength,'length')
    if (currentLength > maxLength) {
        const longestSub = str.slice(maxStart, maxStart + maxLength);
      
      maxLength = currentLength;
      maxStart = start;
      console.log(maxStart,'maxst')
    }

    // Move the 'end' pointer to the right
    end++;
  }

  // Extract the longest substring using maxStart and maxLength
  const longestSub = str.slice(maxStart, maxStart + maxLength);
console.log(longestSub)
  return longestSub;
}


 
// longestSubString("helo")








var removeDuplicates = function(arr) {
    let uniqueArray=[]
  function  removeDep(arr,index,uniqueArray){
        if (index === arr.length) {
    return uniqueArray;
  }

  const currentElement = arr[index];
 
  let isNotThere = true;
  for (let i = 0; i < uniqueArray.length; i++) {
    if (currentElement === uniqueArray[i]) {
      isNotThere = false;
      break;
    }
  }

  if (isNotThere) {
    uniqueArray.push(currentElement);
  }
     return  removeDep(arr, index + 1, uniqueArray);
    }
      removeDep(arr,0,uniqueArray)

  return uniqueArray
};


const resultArray = removeDuplicates([1,2,2,3,4,4,5,6,6,6,7,8]);
 



function search(arr,val){
    if(!arr || !val)return "not found";
    let max=arr.length-1;
    let min=0;
   while(min<=max){
    let middle=Math.floor((max+min)/2);
    if(arr[middle]>val){
     max=middle-1;
    }else if(arr[middle]<val){
       min=middle+1
    }else {
        console.log('found val of',val,'in arr as',arr[middle])
        return middle
    }
   }
   return -1
}
// console.log(search([1,2,3,4,5,6,7,8,9,11],9))



function merge(arr1,arr2){
  let res=[];
  let i=0;
let  j=0;
  while(i<arr1.length && j<arr2.length){
    if(arr1[i]>arr2[j]){
        res.push(arr2[j])
        j++;
    }else {
        res.push(arr1[i]);
        i++;
    }
  }
 
return res.concat(arr1.slice(i),arr2.slice(j))
}

function mergeSort(arr){
    if(arr.length<=1){
        return arr
    }
    let middle=Math.floor(arr.length/2);
    let left=mergeSort(arr.slice(0,middle));
    let right=mergeSort(arr.slice(middle))
    console.log(left,'left',right,'right')
    return merge(left,right)
}



class Node {
    constructor(val){
      this.value=val;
      this.left=null;
      this.right=null
    }
}



class BinarySearch{
  constructor(){
this.root=null
  }
  insert(val){
    
    if(! this.root){
        this.root=new Node(val)
        
    }
    else {
    let newNode =new Node(val);
    let currentNode=this.root;
    
       while(currentNode){
          if(newNode.value>=currentNode.value){
            if(!currentNode.right){
                currentNode.right=newNode;
                break;
            }
            currentNode=currentNode.right;
          }else if(newNode.value<currentNode.value) {
            if(!currentNode.left){
                currentNode.left=newNode
                break;
            }
            currentNode=currentNode.left
          }
       }
       
    
  }
}
find(val,current=this.root){
    if(!current)return "not found";

   
        if(current.value == val){
            return "found  val of"+current.value
        }
        if(val >current.value){
          return this.find(val,current.right)
        }else{
            return this.find(val,current.left)
        }
    
    
}

preOrderTree(current=this.root,res=[]){
    if(current){
       res.push(current.value)
        this.preOrderTree(current?.left,res);
        this.preOrderTree(current?.right,res)
    }
    return res
}
breadthFisrtPreOrder(){
    if(!this.root)return null;
     let stack=[this.root];
     let res=[]
     while(stack.length>0){
         console.log(stack,'stack')
        let current=stack.shift()
        res.push(current.value)
        if(current.left){
         stack.push(current.left)
        }
         if(current.right){

            stack.push(current.right)
        }
        
     }
     return res
}
 seccesserOFNode(node){
 // first case checks if node not null if so then return null
 // i need to go down if there is right
 // in that node if it has left then get the most left node
 let current=this.root;
 let successor=null;
  if(node !==null){ 
    while(current){
        if(current.value>node){
            successor=current;
            current=current.left
        }else if(current.value<node){         
            current=current.right;
        }else {
            if(current.right){          //10
                current=current.right;//7
                while(current.left){ //  8     20
                    current=current.left;
                }
                successor=current;
            }
            break;
        }
    }

  }
  return successor
 }
}


const obj=new BinarySearch();
obj.insert(10)        //10 
obj.insert(20)     //7        20
obj.insert(7)    //    8
                 // 6      9
obj.insert(8)
console.log(obj.seccesserOFNode(8))

// console.log(obj,'obj')






        //          6
        //     3            8
        //               7      9
        //  2     4



