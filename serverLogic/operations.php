<?php
class Operations
{
    function __construct()
    {
    }
    public function saveCompany($pdo, $name, $website)
    {
        try {
            $stmt = $pdo->prepare("INSERT INTO company (name,website)VALUES (?,?)");
            $stmt->execute([$name, $website]);
            $stmt = null;
            return "Company has been saved";
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    public function saveEmployee($pdo, $full_name, $age, $companyId)
    {
        try {
            $stmt = $pdo->prepare("INSERT INTO employee (full_name,age,companyId) VALUES (?,?,?)");
            $stmt->execute([$full_name, $age, $companyId]);
            $stmt = null;
            return "Employee has been saved";
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    public function readCompany($pdo)
    {
        try {
            $stmt = $pdo->prepare("SELECT * FROM company");
            $stmt->execute();
            $result = $stmt->fetchAll();
            $stmt = null;
            return json_encode($result);
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    public function searchCompany($pdo, $companyId)
    {
    }
    public function saveManyCompany($pdo, $companyList)
    {
        $stmt = $pdo->prepare("INSERT INTO company (name, website) VALUES (?,?)");
        try {
            foreach ($companyList as $company) {

                $stmt->execute([$company->name, $company->website]);
            }
            return "Companies has been saved";
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }
    public function saveCompanyAndEmployee($pdo, $company, $employee)
    {
        //For inserting a record both in company and employee in which 	
        //case both are expected to be successiful or fail - all or nothing         
        //i.e a transaction. 
        /*$company and $employee are arrays, which contain data belonging to     company table and employee table respectively*/
        $pdo->setAttribute(PDO::ATTR_AUTOCOMMIT, FALSE);
        try {        //begin a transaction       
            $pdo->beginTransaction();        //prepare the two queries     
            $stmtCompany = $pdo->prepare("INSERT INTO company (name, website) VALUES (?,?)");
            $stmtEmployee = $pdo->prepare("INSERT INTO employee (full_name,age,companyId) VALUES (?,?,?)");        //execute both queries      
            $stmtCompany->execute([$company[0], $company[1]]);
            $stmtEmployee->execute([$employee[0], $employee[1], $employee[2]]);                        //commit here      
            $pdo->commit();
            return 'Transaction was successiful';
        } catch (Exception $e) {        //rollback to cancel if anything goes wrong         
            $pdo->rollBack();
            return $e->getMessage();
        }
    }
}
