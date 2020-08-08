/**
 * @params {Files|Array<File>} 
 */
export function sortBySessionDate(files) {
  return Array.from(files).sort((fileA, fileB) => {
    const sessionDateA = getDateFromSessionFile(fileA);
    const sessionDateB = getDateFromSessionFile(fileB);
    return sessionDateA < sessionDateB ? -1 : 1;
  });
}
/**
 * @param {File} file
 * @returns {Date}
 */
export function getDateFromSessionFile(file) {
  const nameParts = file.name.split('_');
  const sessionDate = nameParts.pop();
  const year = sessionDate.slice(0, 4);
  const month = sessionDate.slice(4, 6);
  const day = sessionDate.slice(6, 8);
  return new Date(year, month, day);
}
/**
 * @param {File} file
 * @returns {String}
 */
export function getNameFromSessionFile(file) {
  const nameParts = file.name.split('_');
  nameParts.pop();
  return nameParts.join('-');
}