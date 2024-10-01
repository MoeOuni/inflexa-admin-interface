const i={all:["customers"],details:()=>[...i.all,"detail"],detail:a=>[...i.details(),a],pagination:a=>[...i.all,"pagination",a],infinite:()=>[...i.all,"infinite"]};export{i as c};
