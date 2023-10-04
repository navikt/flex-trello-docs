rm -f src/apper.json
gh search repos archived:false --topic=team-flex --owner=navikt --limit=200 --json "name"  >> src/apper.json
