export default function MedicineList(medicineProvider, residentId)
{
   return medicineProvider.query(residentId, 'ResidentId')
    .then((response) => {
        if (response.success) {
            return response.data;
        } else {
            throw response;
        }
    })
    .catch((err) => {
        console.log(err);
        alert('something went wrong');
        return err;
    });
}