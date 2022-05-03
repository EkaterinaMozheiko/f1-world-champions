export function getFullName({
  familyName,
  givenName,
}: {
  familyName: string;
  givenName: string;
}) {
  return `${givenName} ${familyName}`;
}
