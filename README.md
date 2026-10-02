This is text editor for Redmine, based on TipTap https://github.com/ueberdosis/tiptap

Supported Redmine versions: **6.\*** (developed and tested on 6.1.4).

Editor engine: **TipTap 3.27.1**. All `@tiptap/*` packages are locked to this exact version in `package-lock.json` and must always be upgraded together, to one and the same version.

## Installation

1. Put the plugin into Redmine's `plugins` folder. The folder must be named `redmine_tiptap`. The easiest way is git, which also makes updates a single command:
   ```sh
   cd /path/to/redmine
   git clone https://github.com/Du10777/redmine_tiptap.git plugins/redmine_tiptap
   ```
2. Restart Redmine.
3. In Redmine settings (redmine.selfhosted/_settings_) choose Text formatting: *TipTap HTML*.

## Updating

The plugin has no database migrations, and the built JavaScript bundle and stylesheet are part of the repository. Updating needs neither npm nor a build on the server: replace the plugin files and restart Redmine.

Before updating, check that the new version supports your Redmine version (see "Supported Redmine versions" above).

### Installed with git (recommended)

```sh
cd /path/to/redmine/plugins/redmine_tiptap
git pull
```

Then restart Redmine, for example:

```sh
sudo systemctl restart redmine          # Redmine running as a systemd service
touch /path/to/redmine/tmp/restart.txt  # Passenger
docker compose restart redmine          # Docker
```

To stay on a particular version instead of the latest commit: `git fetch && git checkout <tag-or-commit>`.

### Installed from an archive

1. Delete the old `plugins/redmine_tiptap` folder and unpack the new version in its place. Deleting first makes sure that files removed in the new version do not linger.
2. Delete `public/assets/.manifest.json` in the Redmine folder.
3. Restart Redmine.

Step 2 matters. At startup Redmine republishes plugin assets only if their files are newer than this manifest. Files unpacked from an archive keep their original timestamps, so without step 2 Redmine may keep serving the old editor. The manifest is recreated automatically at startup. With `git pull` this step is not needed: git gives changed files the current time.

### After updating

- The editor's script and stylesheet are served with a content fingerprint in their URLs, so browsers load the new version right after the restart. Users do not need to clear their browser cache.
- Earlier versions of the plugin copied the script to `public/tiptap_bundle.js`. These files are no longer used and can be deleted:
  ```sh
  rm -f /path/to/redmine/public/tiptap_bundle.js /path/to/redmine/public/tiptap_bundle.js.map
  ```
